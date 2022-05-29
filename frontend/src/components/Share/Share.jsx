import styles from './Share.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhotoFilm,
  faTags,
  faLocationDot,
  faFaceGrinStars,
} from '@fortawesome/free-solid-svg-icons';

const Share = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles.profileImg}
            alt=""
            src="/assets/person/1.jpeg"
          />
          <input
            className={styles.input}
            placeholder="Express your thoughts... "
          />
        </div>
        <hr className={styles.line} />
        <div className={styles.bottom}>
          <div className={styles.options}>
            <div className={styles.share}>
              <FontAwesomeIcon
                style={{ color: 'cornflowerblue' }}
                icon={faPhotoFilm}
                className={styles.icon}
              />
              <span className={styles.shareText}>Media</span>
            </div>
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
          <button className={styles.btn}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
