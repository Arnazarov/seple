import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Feed from '../../components/Feed/Feed';
import styles from './User.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState({});
  const { name } = useParams();
  console.log(name);

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
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LeftBar />
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.cover}>
              <img className={styles.coverImg} src={user.coverImg} alt="" />
              <img className={styles.userImg} src={user.profileImg} alt="" />
            </div>
            <div className={styles.info}>
              <h4 className={styles.infoName}>{user.name}</h4>
              <span className={styles.infoDesc}>{user.desc}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <Feed username={user.name} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
