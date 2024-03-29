import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import Main from '../components/home/main';
import Category from '../components/home/category';
import db from '../utils/database';
import { useMediaQuery } from 'react-responsive';
import ProductsSwiper from '../components/productsSwiper';
import Product from '../models/Product';
import ProductCard from '../components/productCard';
export default function home({ country, products }) {
  // console.log('products', products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: '(max-width:850px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });
  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  // let data = await axios
  //   .get('https://api.ipregistry.co/?key=sd865uwpf7pavcxo')
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
