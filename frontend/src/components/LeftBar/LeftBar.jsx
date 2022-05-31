import styles from './LeftBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRss,
  faMessage,
  faCirclePlay,
  faUserGroup,
  faBookmark,
  faCalendarDay,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

const LeftBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faRss} />
            <span className={styles.listText}>Feed</span>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faMessage} />
            <span className={styles.listText}>Chats</span>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faCirclePlay} />
            <span className={styles.listText}>Videos</span>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faUserGroup} />
            <span className={styles.listText}>Groups</span>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faBookmark} />
            <span className={styles.listText}>Bookmarks</span>
          </li>
          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faCalendarDay} />
            <span className={styles.listText}>Events</span>
          </li>

          <li className={styles.listItem}>
            <FontAwesomeIcon className={styles.icon} icon={faCircleQuestion} />
            <span className={styles.listText}>Questions</span>
          </li>
        </ul>
        <button className={styles.btn}>Show More</button>
        <hr className={styles.line}></hr>
        <h4 className={styles.title}>All Friends</h4>
        <ul className={styles.friendList}>
          <li className={styles.friend}>
            <img
              className={styles.friendImg}
              alt=""
              src="/assets/person/plato.png"
            />
            <span className={styles.friendName}>Omar Hayyam</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
