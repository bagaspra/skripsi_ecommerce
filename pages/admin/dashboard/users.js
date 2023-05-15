import Layout from '../../../components/admin/layout';
import db from '../../../utils/database';
import User from '../../../models/User';
import BasicTable from '../../../components/admin/users/table';

export default function users({ users }) {
  return (
    <Layout>
      <BasicTable rows={users} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
