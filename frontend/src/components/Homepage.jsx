import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.module.css'; // Import the CSS for styling

const Homepage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('userToken');
  //   if (!token) {
  //     alert("Please sign in first");
  //     navigate('/signin');
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/signin');
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to the Bookstore Homepage</h1>
      <p>This is your dashboard for managing books and inventory.</p>
      
      <div className="box-container">
        <div className="box" onClick={() => navigate('/addbook')}>
          <h2>Add Book</h2>
        </div>
        <div className="box" onClick={() => navigate('/searchbook')}>
          <h2>Search Book</h2>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
