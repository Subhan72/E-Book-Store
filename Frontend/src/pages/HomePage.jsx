import React, { useState } from 'react';
import Home from '../components/Home'; // Assuming Home is in the same folder
import Home1 from '../components/Home1'; // Assuming Home1 is in the same folder
import './HomePage.css'
const HomePage = () => {
  // State to toggle between Home and Home1
  const [isHome, setIsHome] = useState(true);

  // Function to toggle the view
  const toggleView = () => {
    setIsHome(prevState => !prevState);
  };

  return (
    <div className="home-page-container">
      {/* Toggle Button */}
      <div className="toggle-container" onClick={toggleView}>
        <div className={`toggle-button ${isHome ? "active" : ""}`}>
          <div className="toggle-options">
            <span className={isHome ? "active-option" : ""}>Browse</span>
            <span className={!isHome ? "active-option" : ""}>Buy</span>
          </div>
        </div>
      </div>

      {/* Conditionally Render Home or Home1 */}
      <div className={`home-content ${isHome ? "home" : "home1"}`}>
        {isHome ? <Home /> : <Home1 />}
      </div>
    </div>
  );
};

export default HomePage;
