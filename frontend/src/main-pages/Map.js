import React from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";
import PictureIcon from '../picture.png'

function Map() {
  const isLoggedIn = true
  const navigate = useNavigate()
  return (
    <div className="main-page-body">
      {(isLoggedIn === false) &&
        <div className="map-not-loggedin">
          <img src={logo} className="map-not-loggedin-logo" alt="logo" />
          <p className="map-not-loggedin-text">Log In or Sign Up to use our map!</p>
          <button onClick={() => { navigate("/login") }} className="map-not-loggedin-button">Get Started</button>
        </div>
      }
      {(isLoggedIn === true) &&
        <div className="map-loggedin">
          <div className='popup-box'>
            <div className='review-popup'>
              <p className="building-name">Sciences Library</p>
              <div className='author-box'>
                <img className="review-image" src={PictureIcon} alt="review"></img>
                <div className="stars">
                  <p className="author">Jane Doe</p>
                  {/* <p className="author">stars</p> */}
                  <p>star rating</p>
                </div>
              </div>
              <textarea className="review-box" placeholder="What did you think?" type="text" required />
              <div className="review-submit">
                <button className="review-submit-button">Post</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Map;