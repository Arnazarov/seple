import styles from './ChatMessage.module.scss';
import moment from 'moment';

const ChatMessage = ({ message, self }) => {
  return (
    <div
      className={
        self ? `${styles.self} ${styles.container}` : `${styles.container}`
      }
    >
      <div className={styles.top}>
        <img className={styles.img} src="/assets/person/noAvatar.png" alt="" />
        <p className={styles.text}>{message.message}</p>
        <img
          className={styles.imgSelf}
          src="/assets/person/noAvatar.png"
          alt=""
        />
      </div>
      <div className={styles.bottom}>{moment(message.createdAt).fromNow()}</div>
    </div>
  );
};

export default ChatMessage;
