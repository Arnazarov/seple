import styles from './ChatMessage.module.scss';

const ChatMessage = () => {
  return (
    <div className={`${styles.self} ${styles.container}`}>
      <div className={styles.top}>
        <img className={styles.img} src="/assets/person/noAvatar.png" alt="" />
        <p className={styles.text}>Some text</p>
      </div>
      <div className={styles.bottom}>just now</div>
    </div>
  );
};

export default ChatMessage;
