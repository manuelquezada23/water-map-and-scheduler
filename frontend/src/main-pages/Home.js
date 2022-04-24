import React from 'react';
import logo from '../logo.png';
import './main-pages.css'

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <p style={{ color: "black" }}>
            Coming soon ;)
          </p>
        </header>
      </div>
    );
  }
}