import styles from './Login.module.scss';
import { useRef } from 'react';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email.current.value);
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
            <button className={styles.btnLog}>Sign In</button>
            <span className={styles.msg}>Forgot Password? Sign Up here.</span>
            <button className={styles.btnReg}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
