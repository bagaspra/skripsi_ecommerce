import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">
            Produk
          </Link>
        </li>
        <li>
          <Link href="/">
            Laptop
          </Link>
        </li>
        <li>
          <Link href="/">
            Komputer
          </Link>
        </li>
      </ul>
    </div>
  );
}
