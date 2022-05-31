import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import Share from '../Share/Share';
import styles from './Feed.module.scss';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get timeline posts of a user
    const getPosts = async () => {
      try {
        const { data } = await axios.get(
          '/api/posts/timeline/62942841f207624f2df43dbc'
        );
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Share />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
