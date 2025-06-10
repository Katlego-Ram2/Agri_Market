import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { FaEnvelope } from 'react-icons/fa';
import { GiGrain } from 'react-icons/gi';
import classNames from 'classnames';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    let error = '';
    if (!value.trim()) {
      error = 'Email is required';
    } else if (!emailRegex.test(value)) {
      error = 'Invalid email format';
    }
    setError(error);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!touched) setTouched(true);
    validateEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
    if (!error && email) {
      console.log('Password reset link sent to:', email);
      // Add your forgot password logic here
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiGrain className={styles.iconTop} />
        <h2>Forgot Password</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={classNames(styles.inputGroup, { [styles.inputGroupError]: touched && error })}>
            <FaEnvelope className={styles.icon} />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {touched && error && <p className={styles.error}>{error}</p>}

          <button type="submit">Send Reset Link</button>
          <div className={styles.links}>
            <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
