import styles from '../../styles/forgot.module.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { BiLeftArrowAlt } from 'react-icons/bi';
import CircledIconBtn from '../../components/buttons/circledIconBtn';
import LoginInput from '../../components/inputs/loginInput';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import DotLoaderSpinner from '../../components/loaders/dotLoader';
import axios from 'axios';
import { signOut, signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';
export default function forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "Anda memerlukan ini saat masuk dan jika Anda perlu mengatur ulang kata sandi."
      )
      .email('Masukkan alamat email yang valid.'),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/forgot', {
        email,
      });
      setError('');
      setSuccess(data.message);
      setLoading(false);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password ?
              <Link href="/" onClick={() => signIn()}>
                Login instead
              </Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CircledIconBtn type="submit" text="Kirim Link" />
                <div style={{ marginTop: '10px' }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}
