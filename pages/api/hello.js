// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../utils/database';

export default function handler(req, res) {
  database.connectDb();
  database.disconnectDb();
  res.status(200).json({ name: 'John Doe' });
}
