import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Feed from '../../components/Feed/Feed';
import styles from './User.module.scss';

const User = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LeftBar />
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.cover}>
              <img
                className={styles.coverImg}
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className={styles.userImg}
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className={styles.info}>
              <h4 className={styles.infoName}>Carlos Casemiro</h4>
              <span className={styles.infoDesc}>Vamoooooos Real!</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <Feed />
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
