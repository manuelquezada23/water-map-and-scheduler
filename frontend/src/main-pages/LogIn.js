import React from 'react';
import logo from '../logo.png';
import './main-pages.css'

export default class LogIn extends React.Component {
    render() {
        return (
            <div className="login">
                <img src={logo} className="login-logo" alt="logo" />
                <p className="login-header">Welcome to Water</p>
            </div>
        );
    }
}