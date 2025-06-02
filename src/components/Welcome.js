import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌾 Welcome to Agri Market</h1>
      <p className={styles.subtitle}>Your digital hub for agriculture trading and news</p>
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/register" className={styles.link}>Register</Link>
      </div>
    </div>
  );
};

export default Welcome;
