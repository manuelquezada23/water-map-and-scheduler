import React, { useState } from 'react';
import './main-pages.css'
import HomePagePicture from '../home-page-picture.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoggedIn, setLogIn] = useState(false)
  const [wait, finishAwait] = useState(false)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogIn(true)
      finishAwait(true)
    } else {
      finishAwait(true)
    }
  });

  return (
    <div className="main-page-body">
      {(!wait) &&
        <div></div>
      }
      {(wait) &&
        <div className="home-content">
          <div className="split left">
            <p className="home-content-title">Water Map & Scheduler</p>
            <p className="home-content-subtitle">Find water fountain locations, schedule your week's events, and enjoy fresh water! </p>
            {(!isLoggedIn) &&
              <button className="home-get-started-button" onClick={() => {navigate('/login')}}>Get Started</button>
            }
            {(isLoggedIn) &&
              <button className="home-get-started-button" onClick={() => {navigate('/map')}}>Map</button>
            }
          </div>
          <div className="split right">
            <div className="centered">
              <img src={HomePagePicture} alt="home-page"></img>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;