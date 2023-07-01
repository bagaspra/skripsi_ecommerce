const midtransClient = require('midtrans-client');
const axios = require('axios');
import nc from 'next-connect';
import auth from '../../../../middleware/auth';
import Order from '../../../../models/Order';
import db from '../../../../utils/database';

const { MIDTRANS_SERVER_KEY } = process.env;
const handler = nc().use(auth);

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
});

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { amount } = req.body;
        const order_id = req.query.id;

        const parameter = {
            transaction_details: {
                order_id: order_id,
                gross_amount: amount,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: 'Bagas',
                last_name: 'Prasetyo',
                email: 'bagasprasetyo36@gmail.com',
                phone: '08975500784',
            },
        };

        snap
            .createTransaction(parameter)
            .then(async (transaction) => {
                const transactionToken = transaction.token;
                console.log('transactionToken:', transactionToken);
                res.json({ success: true, token: transactionToken });
                const order = await Order.findById(order_id);
                if (order) {
                    order.isPaid = true;
                    order.paidAt = Date.now();
                    await order.save();
                    res.json({
                        success: true,
                    });
                } else {
                    res.status(404).json({ message: 'Order not found' });
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error);
                res.status(500).json({ message: 'Failed to create transaction token', error: error.message });
            });
        await db.disconnectDb();
    } catch (error) {
        console.error('Error occurred:', error);
        await db.disconnectDb();
        res.status(500).json({ message: 'Failed to create transaction token', error: error.message });
    }
});

export default handler;
