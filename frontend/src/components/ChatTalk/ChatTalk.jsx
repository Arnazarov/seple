import styles from './ChatTalk.module.scss';

const Talk = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} alt="" src="/assets/person/noAvatar.png" />
      <span className={styles.name}>Name</span>
    </div>
  );
};

export default Talk;
