import Ad from './Ad';
import Main from './Main';
import styles from './styles.module.scss';
import Top from './Top';
export default function Header({ country, searchHandler }) {
  return (
    <header className={styles.header}>
      <Top />
      <Main searchHandler={searchHandler} />
    </header>
  );
}
