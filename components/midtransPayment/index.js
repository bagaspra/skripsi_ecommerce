import { useState, useEffect } from 'react';
import axios from 'axios';
import { Snap } from 'midtrans-client';

export default function MidtransPayment({ total, order_id, midtrans_client_key, order }) {
    const [error, setError] = useState('');


    useEffect(() => {
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const myMidtransClientKey = midtrans_client_key; // Ganti dengan client key Anda

        const script = document.createElement('script');
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', myMidtransClientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const createTransactionToken = async () => {
        try {
            const response = await axios.post(`/api/order/${order_id}/payWithMidtrans`, {
                amount: total,
                id: order_id,
            });
            return response.data.token;
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const handlePayment = async () => {
        try {
            const snap = new Snap({
                isProduction: false,
                clientKey: midtrans_client_key,
            });

            const transactionToken = await createTransactionToken();

            window.snap.pay(transactionToken, {
                onSuccess: function (result) {
                    console.log('Payment success:', result);
                    // Lakukan tindakan yang sesuai setelah pembayaran berhasil
                    window.location.reload(false);
                },
                onPending: function (result) {
                    console.log('Payment pending:', result);
                },
                onError: function (result) {
                    console.error('Payment error:', result);
                    setError('Payment error. Please try again.');
                },
                onClose: function () {
                    console.log('Payment popup closed');
                    // Lakukan tindakan yang sesuai saat popup pembayaran ditutup tanpa menyelesaikan pembayaran
                },
            });
        } catch (error) {
            console.error('Error occurred:', error);
            setError('Error occurred. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay with Midtrans</button>
            {error && <span>{error}</span>}
        </div>
    );
}
