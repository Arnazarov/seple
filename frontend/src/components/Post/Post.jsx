import styles from './Post.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const Posts = ({ post }) => {
  const [like, setLike] = useState(1);
  const [liked, setLiked] = useState(false);

  const likeBtnHandler = (e) => {
    setLike(liked ? like - 1 : like + 1);
    setLiked(!liked);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topL}>
            <img
              src="/assets/person/8.jpeg"
              alt=""
              className={styles.profileImg}
            />
            <span className={styles.profileName}>Noam Chomsky</span>
            <span className={styles.profileDate}>1 min ago</span>
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
            <img src="/assets/heart.png" alt="" className={styles.icon} />
            <img
              src="/assets/like.png"
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
