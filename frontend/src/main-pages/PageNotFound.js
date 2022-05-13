import React from 'react';
import logo from '../logo.png'
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="login">
      <img onClick={() => {
        navigate("/")
      }} src={logo} className="pagenotfound-logo" alt="logo" />
      <p className="login-header">404</p>
      <p className="pagenotfound-text">Page Not Found :(</p>
    </div>
  );
}

export default PageNotFound;