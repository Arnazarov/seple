import Share from '../Share/Share';
import styles from './Feed.module.scss';

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Share />
      </div>
    </div>
  );
};

export default Feed;
