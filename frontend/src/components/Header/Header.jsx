import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMessage,
  faMagnifyingGlass,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

export default function Topbar() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.logo}>SepleConnect</span>
      </div>
      <div className={styles.center}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            placeholder="Search for friend, post or video"
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <span className={styles.link}>Homepage</span>
          <span className={styles.link}>Timeline</span>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconItem}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <span className={styles.iconBadge}>1</span>
          </div>
          <div className={styles.iconItem}>
            <FontAwesomeIcon icon={faMessage} className={styles.icon} />
            <span className={styles.iconBadge}>2</span>
          </div>
          <div className={styles.iconItem}>
            <FontAwesomeIcon icon={faBell} className={styles.icon} />
            <span className={styles.iconBadge}>1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className={styles.topbarImg} />
      </div>
    </div>
  );
}
