import React from 'react';
import './main-pages.css'
import HomePagePicture from '../home-page-picture.png'

function Home() {
  const isLoggedIn = false

  return (
    <div className="main-page-body">

      <div className="split left">
        <p className="home-content-title">Water Map & Scheduler</p>
        <p className="home-content-subtitle">slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here slogan here </p>
        {(isLoggedIn === false) &&
          <button className="home-get-started-button">Get Started</button>
        }
        {(isLoggedIn === true) &&
          <button className="home-get-started-button">Map</button>
        }
      </div>

      <div className="split right">

        <div className="centered">
          <img src={HomePagePicture} alt="home-page-picture"></img>
        </div>
      </div>

    </div>
  );
}

export default Home;