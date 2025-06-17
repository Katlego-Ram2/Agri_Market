import React, { useState } from 'react';
import styles from './Register.module.css';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';
import { GiGrain } from 'react-icons/gi';
import classNames from 'classnames';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    communication: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'username':
        if (!value.trim()) error = 'Username is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value.trim()) error = 'Contact number is required';
        else if (!phoneRegex.test(value)) error = 'Invalid phone number';
        break;
      case 'communication':
        if (!value) error = 'Please select a communication method';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password' && !passwordTouched) {
      setPasswordTouched(true);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);

    if (name === 'password' || name === 'confirmPassword') {
      validateField(
        'confirmPassword',
        name === 'password' ? formData.confirmPassword : value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

 
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );


    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful! You can now login.');
        setFormData({
          fullName: '',
          username: '',
          email: '',
          phone: '',
          communication: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setPasswordTouched(false);
        setConfirmTouched(false);
      } else {
        if (data.errors) {
        
          setErrors(data.errors);
        } else if (data.message) {
          setServerError(data.message);
        } else {
          setServerError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      setServerError('Network error. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  const password = formData.password;
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GiGrain className={styles.iconTop} />
        <h2>Register</h2>

        {serverError && <p className={styles.serverError}>{serverError}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.fullName,
            })}
          >
            <FaUser className={styles.icon} />
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

          {/* Username */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.username,
            })}
          >
            <FaUser className={styles.icon} />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          {/* Email */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.email,
            })}
          >
            <FaEnvelope className={styles.icon} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          {/* Phone */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.phone,
            })}
          >
            <FaPhone className={styles.icon} />
            <input
              name="phone"
              type="tel"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}

          {/* Communication Method */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.communication,
            })}
          >
            <FaComments className={styles.icon} />
            <select
              name="communication"
              value={formData.communication}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="" disabled>
                Select Communication Method
              </option>
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          {errors.communication && (
            <p className={styles.error}>{errors.communication}</p>
          )}

          {/* Password */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: errors.password,
            })}
          >
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

          {/* Password Rules */}
          {passwordTouched && (
            <ul className={styles.passwordChecklist}>
              {!passwordRules.length && <li>➤ Must be at least 8 characters</li>}
              {!passwordRules.uppercase && <li>➤ Must include an uppercase letter</li>}
              {!passwordRules.lowercase && <li>➤ Must include a lowercase letter</li>}
              {!passwordRules.number && <li>➤ Must include a number</li>}
              {!passwordRules.special && (
                <li>➤ Must include a special character (@$!%*?&)</li>
              )}
            </ul>
          )}

          {/* Confirm Password */}
          <div
            className={classNames(styles.inputGroup, {
              [styles.inputGroupError]: confirmTouched && errors.confirmPassword,
            })}
          >
            <FaLock className={styles.icon} />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => {
                handleChange(e);
                if (!confirmTouched) setConfirmTouched(true);
              }}
            />
          </div>
          {confirmTouched && errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}

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
