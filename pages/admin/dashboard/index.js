import Layout from '../../../components/admin/layout';
import styles from '../../../styles/dashboard.module.scss';
import User from '../../../models/User';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Dropdown from '../../../components/admin/dashboard/dropdown';
import Notifications from '../../../components/admin/dashboard/notifications';
import { TbUsers } from 'react-icons/tb';
import { SlHandbag, SlEye } from 'react-icons/sl';
import { SiProducthunt } from 'react-icons/si';
import { GiTakeMyMoney } from 'react-icons/gi';
import Link from 'next/link';
export default function dashboard({ users, orders, products }) {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Shoppay - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{users.length}</h4>
              <span>Pengguna</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{orders.length}</h4>
              <span>Pesanan</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{products.length}</h4>
              <span>Produk</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>Rp. +{orders.reduce((a, val) => a + val.total, 0)}</h4>
              <h5>
                Rp. - {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)} Belum Dibayar.
              </h5>
              <span>Total Penghasilan</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Pesanan Terbaru</h2>
              <Link href="/admin/dashboard/orders">Lihat</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Nama</td>
                  <td>Total</td>
                  <td>Pembayaran</td>
                  <td>Status</td>
                  <td>Lihat</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order.user.name}</td>
                    <td>Rp. {order.total}</td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${order.status == 'Not Processed'
                          ? styles.not_processed
                          : order.status == 'Processing'
                            ? styles.processing
                            : order.status == 'Dispatched'
                              ? styles.dispatched
                              : order.status == 'Cancelled'
                                ? styles.cancelled
                                : order.status == 'Completed'
                                  ? styles.completed
                                  : ''
                          }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>User Terbaru</h2>
              <Link href="/admin/dashboard/users">Lihat Semua</Link>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const users = await User.find().lean();
  const orders = await Order.find()
    .populate({ path: 'user', model: User })
    .lean();
  const products = await Product.find().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
