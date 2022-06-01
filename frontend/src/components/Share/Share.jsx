import styles from './Share.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhotoFilm,
  faTags,
  faLocationDot,
  faFaceGrinStars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const postSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('/api/upload', formData);

      const post = {
        userID: user?._id,
        desc: desc.current.value,
        img: `\\${data}`,
      };

      await axios.post('/api/posts', post);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles.profileImg}
            alt=""
            src={user?.profileImg || '/assets/person/noAvatar.png'}
          />
          <input
            className={styles.input}
            placeholder="Express your thoughts... "
            ref={desc}
          />
        </div>
        <hr className={styles.line} />
        <form
          className={styles.bottom}
          onSubmit={postSubmitHandler}
          method="post"
          encType="multipart/form-data"
        >
          <div className={styles.options}>
            <label htmlFor="file" className={styles.share}>
              <FontAwesomeIcon
                style={{ color: 'cornflowerblue' }}
                icon={faPhotoFilm}
                className={styles.icon}
              />
              <span className={styles.shareText}>Media</span>
              <input
                style={{ display: 'none' }}
                name="image"
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className={styles.share}>
              <FontAwesomeIcon
                style={{ color: 'coral' }}
                icon={faTags}
                className={styles.icon}
              />
              <span className={styles.faTags}>Tag</span>
            </div>
            <div className={styles.share}>
              <FontAwesomeIcon
                style={{ color: 'chartreuse' }}
                icon={faLocationDot}
                className={styles.icon}
              />
              <span className={styles.shareText}>Location</span>
            </div>
            <div className={styles.share}>
              <FontAwesomeIcon
                style={{ color: 'gold' }}
                icon={faFaceGrinStars}
                className={styles.icon}
              />
              <span className={styles.shareText}>Feelings</span>
            </div>
          </div>
          <button className={styles.btn} type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
