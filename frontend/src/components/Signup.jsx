import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import adminImage from '../assets/admin.jpg';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        isAdmin,
      });

      if (response.data) {
        alert('User registered successfully');
        navigate('/login');
      }
    } catch (err) {
      setError('Error during registration: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.left}>
        <h1 className={styles.heading}>Admin Sign Up</h1>
        <img src={adminImage} alt="Admin" className={styles.image} />
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign UP</h2>
          {error && <div className={styles.error}>{error}</div>}
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            Is Admin:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <button type="submit" className={styles.button}>
            Submit
          </button>
          <p>
            Already have an account? <Link to="/signin" className={styles.link}>Sign In</Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default SignUp;
