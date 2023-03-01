import styles from './styles.module.scss';

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Metode Pembayaran</h2>
      <div className={styles.images}>
        <img src="../../../images/payment/visa.webp" alt="" />
        <img src="../../../images/payment/mastercard.webp" alt="" />
      </div>
      <h2 className={styles.header}>Perlindungan Pelanggan</h2>
      <div className={styles.protection}>
        <img src="../../../images/protection.png" alt="" />
        Dapatkan pengembalian dana penuh jika barang tidak seperti yang dijelaskan atau jika tidak dikirim.
      </div>
    </div>
  );
}
