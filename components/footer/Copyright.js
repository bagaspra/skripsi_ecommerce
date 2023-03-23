import Link from 'next/link';
import styles from './styles.module.scss';
export default function Copyright() {
  return (
    <div className={styles.footer__copyright}>
      <section>©2023 Astrindo Shop All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
const data = [
  {
    name: 'Pusat Privasi',
    link: '',
  },
  {
    name: 'Kebijakan Privasi & Cookie kami',
    link: '',
  },
  {
    name: 'Kelola Cookie',
    link: '',
  },
  {
    name: 'Syarat dan Ketentuan',
    link: '',
  }
];
