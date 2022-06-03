import styles from './RightBar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RightBar = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFriends = async () => {
        try {
          const { data } = await axios.get(`/api/users/friends/${user._id}`);
          setFriends(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFriends();
    }
  }, [user]);

  function HomeRB() {
    return (
      <>
        <div className={styles.birthday}>
          <img className={styles.birthdayImg} src="assets/gift.png" alt="" />
          <span className={styles.birthdayText}>
            <b>Friedrich Nietzsche</b> and <b>2 other friends</b> have a
            birthday today.
          </span>
        </div>
        <img className={styles.ad} src="assets/ad.jpg" alt="" />
        <h4 className={styles.title}>Online Friends</h4>
        <ul className={styles.friends}>
          <li className={styles.friend}>
            <div className={styles.imgContainer}>
              <img
                className={styles.profileImg}
                alt=""
                src="/assets/person/aristotle.png"
              />
              <span className={styles.online}></span>
            </div>
            <span className={styles.name}>Aristotle</span>
          </li>
          <li className={styles.friend}>
            <div className={styles.imgContainer}>
              <img
                className={styles.profileImg}
                alt=""
                src="/assets/person/plato.png"
              />
              <span className={styles.online}></span>
            </div>
            <span className={styles.name}>Plato</span>
          </li>
        </ul>
      </>
    );
  }

  function UserRB() {
    return (
      <>
        <h4 className={styles.profileTitle}>Profile</h4>
        <div className={styles.profileInfo}>
          <div className={styles.item}>
            <span className={styles.itemName}>City: </span>
            <span className={styles.itemDesc}>{user?.currentCity}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemName}>From: </span>
            <span className={styles.itemDesc}>{user?.hometown}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemName}>Status: </span>
            <span className={styles.itemDesc}>Complex</span>
          </div>
        </div>
        <h4 className={styles.profileTitle}>Friends</h4>
        <div className={styles.friendsInfo}>
          {friends &&
            friends.map((friend) => (
              <Link
                key={friend._id}
                to={`/profile/${friend.name}`}
                className={styles.friendLink}
              >
                <div key={friend._id} className={styles.following}>
                  <img
                    src={friend.profileImg}
                    alt=""
                    className={styles.friendImg}
                  />
                  <span className={styles.friendDesc}>{friend.name}</span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{user ? <UserRB /> : <HomeRB />}</div>
    </div>
  );
};

export default RightBar;
