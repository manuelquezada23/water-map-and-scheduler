import React from 'react';
import logo from '../logo.png'

export default class PageNotFound extends React.Component {
  render() {
    return (
      <div className="Home">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 style={{ color: "#5393C6", marginBottom: -20 }}>404</h1>
          <p style={{ color: "black" }}> Page Not Found :( </p>
        </header>
      </div>
    );
  }
}