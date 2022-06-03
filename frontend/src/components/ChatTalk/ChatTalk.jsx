import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ChatTalk.module.scss';

const Talk = ({ talk, user: loggedUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userID = talk?.members.find((id) => id !== loggedUser?._id);
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users?userID=${userID}`);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [loggedUser, talk]);

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        alt=""
        src={user ? user.profileImg : '/assets/person/noAvatar.png'}
      />
      <span className={styles.name}>{user && user.name}</span>
    </div>
  );
};

export default Talk;
