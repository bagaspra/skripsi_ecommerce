import nc from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '../../../utils/validation';
import db from '../../../utils/database';
import User from '../../../models/User';
import { createActivationToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendEmails';
import { activateEmailTemplate } from '../../../emails/activateEmailTemplate';
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Harap isi semua kolom.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Email tidak valid.' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email ini sudah ada.' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Kata sandi harus minimal 6 karakter.' });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });

    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, '', 'Activate your account.', activateEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: 'Registrasi Sukses Silahkan Login.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
