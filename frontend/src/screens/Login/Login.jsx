import styles from './Login.module.scss';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Message from '../../components/Message/Message';
import {
  loginError,
  loginRequest,
  loginSuccess,
} from '../../context/AuthActions';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { loading, error, dispatch } = useContext(AuthContext);

  const authUser = async (userInfo, dispatch) => {
    try {
      dispatch(loginRequest());
      const { data } = await axios.post('/api/users/login', userInfo);

      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginError(error));
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const userInfo = {
      email: email.current.value,
      password: password.current.value,
    };

    authUser(userInfo, dispatch);
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
          <form className={styles.login} onSubmit={loginHandler}>
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
            <button className={styles.btnLog} type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                'Sign In'
              )}
            </button>

            <span className={styles.msg}>Forgot Password? Sign Up here.</span>
            <Link to="/signup">
              <button className={styles.btnReg}>Sign Up</button>
            </Link>
            {error && (
              <Message
                msg={'Something went wrong! Try again.'}
                severity={'error'}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
