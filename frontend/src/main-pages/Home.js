import React, { useState } from 'react';
import './main-pages.css'
import HomePagePicture from '../home-page-picture.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
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
            <p className="home-content-subtitle">slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here </p>
            {(!isLoggedIn) &&
              <button className="home-get-started-button">Get Started</button>
            }
            {(isLoggedIn) &&
              <button className="home-get-started-button">Map</button>
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