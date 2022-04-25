import React, { useEffect, useRef } from 'react';
import './components.css'
import logo from '../logo.png'
import { useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let currentPathName = location.pathname

    document.getElementById('home-button').style.color = "black"
    document.getElementById('about-button').style.color = "black"
    document.getElementById('map-button').style.color = "black"
    document.getElementById('contact-button').style.color = "black"

    switch (currentPathName) {
      case "/":
        document.getElementById('home-button').style.color = "#5393C6"
        break;
      case "/about":
        document.getElementById('about-button').style.color = "#5393C6"
        break;
      case "/map":
        document.getElementById('map-button').style.color = "#5393C6"
        break;
      case "/contact":
        document.getElementById('contact-button').style.color = "#5393C6"
        break;
      default:
        break;
    }
  });

  function navBarButtonOnClick(buttonId) {
    switch (buttonId) {
      case "home-button":
        navigate("/")
        break;
      case "about-button":
        navigate("/about")
        break;
      case "map-button":
        navigate("/map")
        break;
      case "contact-button":
        navigate("/contact")
        break;
      case "login-button":
        navigate("/login")
        break;
      case "signup-button":
        navigate("/signup")
        break;
      default:
        break;
    }
  }

  return (
    <div className="navigationBar">
      <img id="navigationBar-logo" src={logo}></img>
      <div className="navigationBar-mainPageButtons">
        <button className="navigationBar-button" id="home-button" onClick={() => { navBarButtonOnClick("home-button") }}>Home</button>
        <button className="navigationBar-button" id="about-button" onClick={() => { navBarButtonOnClick("about-button") }}>About</button>
        <button className="navigationBar-button" id="map-button" onClick={() => { navBarButtonOnClick("map-button") }}>Map</button>
        <button className="navigationBar-button" id="contact-button" onClick={() => { navBarButtonOnClick("contact-button") }}>Contact</button>
      </div>
      <div className="navigationBar-userButtons">
        <button className="navigationBar-button" id="login-button" onClick={() => { navBarButtonOnClick("login-button") }}>Log In</button>
        <button className="navigationBar-button" id="signup-button" onClick={() => { navBarButtonOnClick("signup-button") }}>Sign Up</button>
      </div>

    </div>
  );
}

export default NavigationBar;
