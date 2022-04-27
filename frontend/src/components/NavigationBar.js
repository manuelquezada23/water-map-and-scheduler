import React, { useEffect, useRef } from 'react';
import './components.css'
import logo from '../logo.png'
import { useNavigate, useLocation } from "react-router-dom";
import PictureIcon from '../picture.png';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function NavigationBar() {

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = true

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      {(isLoggedIn === true) &&
        <div className="navigationBar-userButtons">
          <img className="navigationBar-profile-image" src={PictureIcon}></img>
          <p className="navigationBar-profile-name" onClick={handleClick}>Manuel Quezada</p>
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
            <MenuItem onClick={() => {navigate("/user-profile")}}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CalendarMonthIcon fontSize="small" />
              </ListItemIcon>
              Schedule
            </MenuItem>
            <MenuItem>
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
