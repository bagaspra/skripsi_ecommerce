import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import ShippingInput from '../../inputs/shippingInput';
import { applyCoupon } from '../../../requests/user';
import axios from 'axios';
import Router from 'next/router';
export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');
  const [order_error, setOrder_Error] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (selectedAddress?.city === 'Makassar') {
      setShippingPrice(50000);
    } else {
      setShippingPrice(0);
    }
  }, [selectedAddress]);

  const validateCoupon = Yup.object({
    coupon: Yup.string().required('Please enter a coupon first!'),
  });

  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError('');
    }
  };

  const placeOrderHandler = async () => {
    try {
      if (paymentMethod === '') {
        setOrder_Error('Please choose a payment method.');
        return;
      } else if (!selectedAddress) {
        setOrder_Error('Please choose a shipping address.');
        return;
      }

      let updatedShippingPrice = shippingPrice;
      const { data } = await axios.post('/api/order/create', {
        products: cart.products,
        shippingAddress: selectedAddress,
        shippingPrice: updatedShippingPrice,
        paymentMethod,
        total: (totalAfterDiscount !== '' ? totalAfterDiscount : cart.cartTotal) + updatedShippingPrice,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrder_Error(error.response.data.message);
    }
  };

  console.log(shippingPrice)

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Ringkasan Pesanan</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            applyCouponHandler();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="*Kupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.apply_btn} type="submit">
                Terapkan
              </button>
              <div className={styles.infos}>
                {selectedAddress?.city === 'Makassar' && (
                  <span>
                    Biaya Pengiriman : <b>Rp. {shippingPrice}</b>
                  </span>
                )}
                <span>
                  Total : Rp. <b>{cart.cartTotal + shippingPrice}</b>
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Kupon diterapkan : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal && totalAfterDiscount !== '' && (
                  <span>
                    Total Akhir : <b>Rp. {totalAfterDiscount + shippingPrice}</b>
                  </span>
                )}
              </div>

            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
        Bayar
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  );
}
