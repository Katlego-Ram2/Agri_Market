import React from 'react';
import styles from './Register.module.css';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { GiGrain } from 'react-icons/gi';

const Register = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiGrain className={styles.iconTop} />
        <h2>Register</h2>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.inputGroup}>
            <FaPhone className={styles.icon} />
            <input type="tel" placeholder="Contact Number" />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <button type="submit">Register</button>
          <div className={styles.links}>
            <a href="/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;