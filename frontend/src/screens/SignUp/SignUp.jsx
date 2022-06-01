import { useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.scss';
import Message from '../../components/Message/Message';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordRepeat = useRef();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  });

  const signupHandler = async (e) => {
    e.preventDefault();

    if (password.current.value === passwordRepeat.current.value) {
      const userInfo = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const { data } = await axios.post('/api/users', userInfo);
        data && navigate('/login');
      } catch (error) {
        console.log(error);
        setError(true);
      }
    } else {
      passwordRepeat.current.setCustomValidity(
        'Passwords do not match! Try again, but this time precautiously.'
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h3 className={styles.logo}>Seple</h3>
          <span className={styles.desc}>
            Be social. Stay connected. Act positive.
          </span>
        </div>
        <div className={styles.right}>
          <form className={styles.login} onSubmit={signupHandler}>
            <input
              className={styles.input}
              required
              ref={name}
              type="text"
              placeholder="Enter your name"
            />
            <input
              className={styles.input}
              required
              ref={email}
              type="email"
              placeholder="Enter your email"
            />
            <input
              className={styles.input}
              required
              ref={password}
              type="password"
              placeholder="Enter your password"
            />
            <input
              className={styles.input}
              required
              ref={passwordRepeat}
              type="password"
              placeholder="Re-enter your password"
            />
            <button className={styles.btnReg} type="submit">
              Create an Account
            </button>
            <span className={styles.msg}>Have an Account? Sign in below.</span>
            <Link to="/login">
              <button className={styles.btnLog}>Sign In</button>
            </Link>
            {error && (
              <Message
                msg={"Something went wrong! Refresh 'n' try again."}
                severity={'error'}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
