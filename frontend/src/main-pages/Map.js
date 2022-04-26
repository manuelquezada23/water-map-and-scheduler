import React from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";

function Map() {
  const isLoggedIn = false
  const navigate = useNavigate()

  return (
    <div className="main-page-body">
      {(isLoggedIn === false) &&
        <div className="map-not-loggedin">
          <img src={logo} className="map-not-loggedin-logo" alt="logo" />
          <p className="map-not-loggedin-text">Log In or Sign Up to use our map!</p>
          <button onClick={() => {navigate("/login")}} className="map-not-loggedin-button">Get Started</button>
        </div>
      }
    </div>
  );
}

export default Map;