import React, { useState } from 'react';
import styles from './Login.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { GiGrain } from 'react-icons/gi';
import classNames from 'classnames';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = `${name === 'username' ? 'Username' : 'Password'} is required`;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField('username', formData.username);
    validateField('password', formData.password);

    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && formData.username && formData.password) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setServerError(data.message || 'Login failed');
          return;
        }

        // Save user data to localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('roleId', data.roleId);
        localStorage.setItem('redirectPath', data.redirectPath);

        // Redirect
        window.location.href = data.redirectPath;

      } catch (error) {
        console.error('Login error:', error);
        setServerError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiGrain className={styles.iconTop} />
        <h2>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className={classNames(styles.inputGroup, { [styles.inputGroupError]: errors.username })}>
            <FaUser className={styles.icon} />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          {/* Password */}
          <div className={classNames(styles.inputGroup, { [styles.inputGroupError]: errors.password })}>
            <FaLock className={styles.icon} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          {/* Server error */}
          {serverError && <p className={styles.error}>{serverError}</p>}

          <button type="submit">Login</button>

          <div className={styles.links}>
            <a href="/forgot-password">Forgot Password?</a>
            <span> | </span>
            <a href="/register">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
