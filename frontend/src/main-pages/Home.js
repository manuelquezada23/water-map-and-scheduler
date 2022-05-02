import React from 'react';
import './main-pages.css'
import HomePagePicture from '../home-page-picture.png'
import { getAuth } from "firebase/auth";

function Home() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="main-page-body">
      <div className="home-content">
        <div className="split left">
          <p className="home-content-title">Water Map & Scheduler</p>
          <p className="home-content-subtitle">slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here </p>
          {(!user) &&
            <button className="home-get-started-button">Get Started</button>
          }
          {(user) &&
            <button className="home-get-started-button">Map</button>
          }
        </div>
        <div className="split right">
          <div className="centered">
            <img src={HomePagePicture} alt="home-page"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;