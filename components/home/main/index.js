import styles from './styles.module.scss';
import MainSwiper from './swiper';
import Offers from './offers';
import Menu from './Menu';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Navigation } from 'swiper';
import User from './User';
import Header from './Header';
export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}
