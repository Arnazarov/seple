import { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post';
import Share from '../Share/Share';
import styles from './Feed.module.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Get timeline posts of a user
    const getPosts = async () => {
      try {
        const { data } = username
          ? await axios.get(`/api/posts/profile/${username}`)
          : await axios.get(`/api/posts/timeline/${user._id}`);
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, [username, user._id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {(user || username === user?.name) && <Share />}
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
