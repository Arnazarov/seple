import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ChatOnline.module.scss';

const ChatOnline = ({ onlineUsers, currentUser, setChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await axios.get(`/api/users/friends/${currentUser}`);
        setFriends(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const clickHandler = async (user) => {
    try {
      const { data } = await axios.get(
        `/api/talk/find/${currentUser}/${user._id}`
      );
      console.log(data);
      setChat(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {onlineFriends &&
        onlineFriends.map((of) => (
          <div
            key={of._id}
            className={styles.person}
            onClick={() => clickHandler(of)}
          >
            <div className={styles.imgContainer}>
              <img className={styles.img} src={of.profileImg} alt="" />
              <div className={styles.badge}></div>
            </div>
            <span className={styles.name}>{of.name}</span>
          </div>
        ))}
    </div>
  );
};

export default ChatOnline;
