import Link from 'next/Link';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link legacyBehavior href="">
            Produk
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="">
            Laptop
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="">
            Komputer
          </Link>
        </li>
      </ul>
    </div>
  );
}
