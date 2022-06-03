import styles from './ChatOnline.module.scss';

const ChatOnline = () => {
  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src="/assets/person/noAvatar.png"
            alt=""
          />
          <div className={styles.badge}></div>
        </div>
        <span className={styles.name}>Name</span>
      </div>
    </div>
  );
};

export default ChatOnline;
