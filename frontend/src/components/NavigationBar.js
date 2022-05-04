import React, { useEffect, useState } from 'react';
import './components.css'
import logo from '../logo.png'
import { useNavigate, useLocation } from "react-router-dom";
import PictureIcon from '../picture.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import PictureIconLarge from '../picture-large.png'

function NavigationBar() {

  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userDisplayName, setUserDisplayName] = useState('')
  const [file, setFile] = useState(PictureIconLarge)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoggedIn(true)
        setUserEmail(user.email)
        setUserDisplayName(user.displayName)
        const photoURL = user.photoURL;
        // console.log(photoURL)
        // if (typeof user.photoURL != "undefined") {
        //   setFile(user.photoURL)
        // }
      } else {
        // User is signed out
        setLoggedIn(false)
      }
    });

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

  function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/')
      window.location.reload(false);
    }).catch((error) => {
      // An error happened.
      window.alert(error)
    });
  }

  return (
    <div className="navigationBar">
      <img id="navigationBar-logo" src={logo} alt="logo"></img>
      <div className="navigationBar-mainPageButtons">
        <button className="navigationBar-button" id="home-button" onClick={() => { navBarButtonOnClick("home-button") }}>Home</button>
        <button className="navigationBar-button" id="about-button" onClick={() => { navBarButtonOnClick("about-button") }}>About</button>
        <button className="navigationBar-button" id="map-button" onClick={() => { navBarButtonOnClick("map-button") }}>Map</button>
        <button className="navigationBar-button" id="contact-button" onClick={() => { navBarButtonOnClick("contact-button") }}>Contact</button>
      </div>
      {(isLoggedIn === true) &&
        <div className="navigationBar-userButtons">
          <img className="navigationBar-profile-image" src={file} alt="profile"></img>
          <p className="navigationBar-profile-name" onClick={handleClick}>{userDisplayName}</p>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => { navigate("/user-profile") }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate("/schedule") }}>
              <ListItemIcon>
                <CalendarMonthIcon fontSize="small" />
              </ListItemIcon>
              Schedule
            </MenuItem>
            <MenuItem onClick={() => { logOut() }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </div>
      }
      {(isLoggedIn === false) &&
        <div className="navigationBar-userButtons">
          <button className="navigationBar-button" id="signup-button" onClick={() => { navBarButtonOnClick("signup-button") }}>Sign Up</button>
          <button className="navigationBar-button" id="login-button" onClick={() => { navBarButtonOnClick("login-button") }}>Log In</button>
        </div>
      }
    </div>
  );
}

export default NavigationBar;
