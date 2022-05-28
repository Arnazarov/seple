import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Feed from '../../components/Feed/Feed';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LeftBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
