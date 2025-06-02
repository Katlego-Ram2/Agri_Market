import React from 'react';
import styles from './Login.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { GiGrain } from 'react-icons/gi';

const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiGrain className={styles.iconTop} />
        <h2>Login</h2>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
