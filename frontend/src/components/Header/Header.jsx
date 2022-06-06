import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../context/AuthActions';

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to="/" className={styles.link}>
          <span className={styles.logo}>Metamorphosis</span>
        </Link>
      </div>
      <div className={styles.center}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            placeholder="Search for a friend, post or video"
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.icons}>
          <Link to="/chat" className={styles.link}>
            <div className={styles.iconItem}>
              <FontAwesomeIcon icon={faMessage} className={styles.icon} />
              <span className={styles.iconBadge}>2</span>
              <p className={styles.iconText}>Chat</p>
            </div>
          </Link>

          <Link to="/login" className={styles.link} onClick={logoutHandler}>
            <div className={styles.iconItem}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={styles.icon}
              />
              <p className={styles.iconText}>Sign out</p>
            </div>
          </Link>

          <Link to={`/profile/${user?.name}`}>
            <img
              src={user ? user.profileImg : '/assets/person/noAvatar.png'}
              alt=""
              className={styles.topbarImg}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
