import styles from './Login.module.scss';

const Login = () => {
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
          <div className={styles.login}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your password"
            />
            <button className={styles.btnLog}>Sign In</button>
            <span className={styles.msg}>Forgot Password? Sign Up here.</span>
            <button className={styles.btnReg}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
