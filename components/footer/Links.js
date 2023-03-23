import Link from 'next/link';
import styles from './styles.module.scss';

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul>
          {i === 0 ? (
            <img src="../../../logo.png" alt="" />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
const links = [
  {
    heading: 'Astrindo',
    links: [
      {
        name: 'Tentang Kami',
        link: '',
      },
      {
        name: 'Hubungi Kami',
        link: '',
      },
      {
        name: 'Social Responsibility',
        link: '',
      },
      {
        name: '',
        link: '',
      },
    ],
  },
  {
    heading: 'Bantuan',
    links: [
      {
        name: 'Info Pengiriman',
        link: '',
      },
      {
        name: 'Pengembalian',
        link: '',
      },
      {
        name: 'Cara Memesanan',
        link: '',
      },
      {
        name: 'Cara Melacak',
        link: '',
      },
      {
        name: 'Panduan',
        link: '',
      },
    ],
  },
  {
    heading: 'Pelayanan Pelanggan',
    links: [
      {
        name: 'Pelayanan Pelanggan',
        link: '',
      },
      {
        name: 'Syarat dan Ketentuan',
        link: '',
      },
      {
        name: 'Transaksi',
        link: '',
      },
      {
        name: 'Isi Survey',
        link: '',
      },
    ],
  },
];
