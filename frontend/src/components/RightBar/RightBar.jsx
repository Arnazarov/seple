import styles from './RightBar.module.scss';

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.birthday}>
          <img className={styles.birthdayImg} src="assets/gift.png" alt="" />
          <span className={styles.birthdayText}>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className={styles.ad} src="assets/ad.png" alt="" />
        <h4 className={styles.title}>Online Friends</h4>
        <ul className={styles.friends}>
          <li className={styles.friend}>
            <div className={styles.imgContainer}>
              <img
                className={styles.profileImg}
                alt=""
                src="/assets/person/1.jpeg"
              />
              <span className={styles.online}></span>
            </div>
            <span className={styles.name}>Ipek Cinar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
