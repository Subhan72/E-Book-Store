import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';
import adminImage from '../assets/admin.jpg'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem('userToken', response.data.token);
        navigate('/home');
      }
    } catch (err) {
      setError('Error during sign-in: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.left}>
        <h1 className={styles.heading}>Admin Sign In</h1>
        <img src={adminImage} alt="Admin" className={styles.image} />
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          {error && <div className={styles.error}>{error}</div>}
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
          <button type="submit" className={styles.button}>
            Sign In
          </button>
          <p>
          Need an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
