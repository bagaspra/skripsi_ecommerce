import styles from './styles.module.scss';

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>Pembayaran Melalui</h3>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payment/visa.webp" alt="" />
        <img src="../../../images/payment/mastercard.webp" alt="" />
      </div>
    </div>
  );
}
