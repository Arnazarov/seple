import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Feed from '../../components/Feed/Feed';
import styles from './User.module.scss';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { follow, unfollow } from '../../context/AuthActions';

const User = () => {
  const [user, setUser] = useState(null);
  const { name } = useParams();
  const [following, setFollowing] = useState(false);

  const { user: loggedUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setFollowing(loggedUser.following.includes(user?._id));
  }, [loggedUser, user]);

  useEffect(() => {
    // Fetch the current user
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users?username=${name}`);
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [name]);

  const followBtnHandler = async () => {
    try {
      if (following) {
        await axios.put(`/api/users/${user._id}/unfollow`, {
          userID: loggedUser._id,
        });
        dispatch(unfollow(user._id));
      } else {
        await axios.put(`/api/users/${user._id}/follow`, {
          userID: loggedUser._id,
        });
        dispatch(follow(user._id));
      }
    } catch (error) {
      console.log(error);
    }
    setFollowing(!following);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LeftBar />
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.cover}>
              <img
                className={styles.coverImg}
                src={user?.coverImg || '/assets/person/noCover.png'}
                alt=""
              />
              <img
                className={styles.userImg}
                src={user?.profileImg || '/assets/person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className={styles.info}>
              <h4 className={styles.infoName}>{user?.name}</h4>
              <span className={styles.infoDesc}>{user?.desc}</span>
              {name !== loggedUser.name && (
                <Button
                  variant="outlined"
                  size="medium"
                  className={styles.btnFollow}
                  onClick={followBtnHandler}
                >
                  <FontAwesomeIcon
                    icon={following ? faCircleMinus : faCirclePlus}
                    className={styles.iconFollow}
                  />
                  {following ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            {user && <Feed username={user.name} />}
            {user && <RightBar user={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
