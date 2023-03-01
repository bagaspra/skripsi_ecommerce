import styles from './styles.module.scss';

export default function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartToDbHandler,
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Ringkasan Pesanan</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>Rp. {subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Pengiriman</span>
        <span>Rp. +{shippingFee}</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>Rp. {total}</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length == 0}
          style={{
            background: `${selected.length == 0 ? '#eee' : ''}`,
            cursor: `${selected.length == 0 ? 'not-allowed' : ''}`,
          }}
          onClick={() => saveCartToDbHandler()}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
