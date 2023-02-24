import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link legacyBehavior href="">
            <div>Store</div>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="">
            <div>Electronics</div>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="">
            <div>Watches</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
