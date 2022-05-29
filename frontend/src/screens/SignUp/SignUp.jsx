import styles from './SignUp.module.scss';

const SignUp = () => {
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
              type="text"
              placeholder="Enter your name"
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Re-enter your password"
            />
            <button className={styles.btnReg}>Create an Account</button>
            <span className={styles.msg}>Have an Account? Sign in below.</span>
            <button className={styles.btnLog}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
