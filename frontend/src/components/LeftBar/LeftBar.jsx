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
import { useEffect, useState } from 'react';
import axios from 'axios';

const LeftBar = () => {
  const [users, setUsers] = useState([]);

  const sortByNames = (users) => {
    return users.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users/all');
        setUsers(sortByNames(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

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
          {users &&
            users.map((user) => (
              <li key={user._id} className={styles.friend}>
                <img
                  className={styles.friendImg}
                  alt=""
                  src={user.profileImg}
                />
                <span className={styles.friendName}>{user.name}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
