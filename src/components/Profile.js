import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    communication: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/user/${userId}`)
        .then(res => {
          const { full_name, username, email, phone, communication } = res.data;
          setFormData(prev => ({
            ...prev,
            fullName: full_name,
            username,
            email,
            phone,
            communication,
          }));
        })
        .catch(err => {
          console.error('Error loading profile:', err);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      await axios.put(`http://localhost:5000/user/${userId}`, formData);
      alert("Profile updated successfully!");
      // Clear passwords on successful update
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Communication Preference
          <input
            type="text"
            name="communication"
            value={formData.communication}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g., Email, SMS"
            required
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Leave blank to keep current password"
          />
        </label>

        <label style={styles.label}>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="Confirm new password"
          />
        </label>

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '12px',
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    marginTop: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '700',
  },
};

export default Profile;
