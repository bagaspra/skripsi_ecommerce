import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoginInput from '../components/inputs/loginInput';
import { useState } from 'react';
import CircledIconBtn from '../components/buttons/circledIconBtn';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';
import axios from 'axios';
import DotLoaderSpinner from '../components/loaders/dotLoader';
import Router from 'next/router';
const initialvalues = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
  login_error: '',
};
export default function signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required('Silahkan isi alamat email.')
      .email('Silahkan isi alamat email yang valid.'),
    login_password: Yup.string().required('Silahkan isi password'),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Siapa namamu ?")
      .min(2, 'Nama pertama harus antara 2 dan 64 karakter.')
      .max(64, 'Nama pertama harus antara 2 dan 64 karakter.')
      .matches(/^[aA-zZ]/, 'Nomor dan karakter spesial tidak bisa digunakan'),
    email: Yup.string()
      .required(
        "Anda memerlukan ini saat masuk dan jika Anda perlu mengatur ulang kata sandi."
      )
      .email('Silahkan isi alamat email yang valid.'),
    password: Yup.string()
      .required(
        'Masukkan kombinasi minimal enam angka, huruf, dan tanda baca (seperti ! dan &).'
      )
      .min(6, 'password minimal 6 karakter')
      .max(36, "password maksimal 64 karakter"),
    conf_password: Yup.string()
      .required('Konfirmasi password anda.')
      .oneOf([Yup.ref('password')], 'password tidak sama.'),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setUser({ ...user, error: '', success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn('credentials', options);
        Router.push('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: '', error: error.response.data.message });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn('credentials', options);
    setUser({ ...user, success: '', error: '' });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || '/');
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Terima Kasih Memilih Kami!{' '}
              <Link legacyBehavior href="/">
                Ke Toko
              </Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Masuk</h1>
            <p>
              Silakan masukkan informasi akun Anda untuk melanjutkan.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Masuk" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link legacyBehavior href="/auth/forgot">
                      Lupa password ?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Atau Lanjutkan dengan</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name == 'Credentials') {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Login dengan {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Daftar Baru</h1>
            <p>
              Sudah siap untuk belanja? Masukkan informasi akun Anda untuk memulai.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Nama Lengkap"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Alamat Email"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Masukkan Ulang Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Daftar" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
