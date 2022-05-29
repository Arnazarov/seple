import Post from '../Post/Post';
import Share from '../Share/Share';
import styles from './Feed.module.scss';

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
