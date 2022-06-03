import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';

const Posts = ({ post }) => {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post?.likes.length);
  const [liked, setLiked] = useState(false);

  const { user: loggedUser } = useContext(AuthContext);

  // Update component state 'liked' when post.likes changes
  useEffect(() => {
    setLiked(post.likes.includes(loggedUser._id));
  }, [loggedUser._id, post.likes]);

  useEffect(() => {
    // Fetch the user who created this post
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users?userID=${post?.userID}`);
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [post.userID]);

  const likeBtnHandler = async (e) => {
    try {
      await axios.put(`/api/posts/${post._id}/like`, {
        userID: loggedUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(liked ? like - 1 : like + 1);
    setLiked(!liked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topL}>
            <Link to={`/profile/${user.name}`}>
              <img
                src={user.profileImg || '../assets/person/noAvatar.png'}
                alt=""
                className={styles.profileImg}
              />
            </Link>
            <span className={styles.profileName}>{user.name}</span>
            <span className={styles.profileDate}>
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className={styles.topR}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </div>
        <div className={styles.center}>
          <span className={styles.postText}>{post.desc}</span>
          <img src={post.img} alt="" className={styles.postImg} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomL}>
            <img
              src="/assets/like.png"
              alt=""
              className={styles.icon}
              onClick={likeBtnHandler}
            />
            <img
              src="/assets/heart.png"
              alt=""
              className={styles.icon}
              onClick={likeBtnHandler}
            />

            <span className={styles.likeCounter}>{like} people liked it</span>
          </div>
          <div className={styles.bottomR}>
            <span className={styles.comment}>7 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
