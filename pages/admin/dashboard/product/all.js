import styles from '../../../../styles/products.module.scss';
import Layout from '../../../../components/admin/layout';
import db from '../../../../utils/database';
import Product from '../../../../models/Product';
import Category from '../../../../models/Category';
import ProductCard from '../../../../components/admin/products/productCard';
import { useState } from 'react';
export default function all({ products }) {
  const [data, setData] = useState(products);
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
      {data.map((data) => (
        <ProductCard product={data} key={data._id} setProduct={setData} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: 'category', model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
