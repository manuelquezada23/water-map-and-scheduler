import React from 'react';
import logo from '../logo.png';
import './main-pages.css'
import { useNavigate, useLocation } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate();
    return (
        <div className="login">
            <img onClick={() => {
                navigate("/")
            }} src={logo} className="login-logo" alt="logo" />
            <p className="login-header">Welcome to Water</p>
            <form>
                <div className="login-input-boxes">
                    <div>
                        <input className="login-input" placeholder="Email" type="text" name="uname" required />
                    </div>
                    <div>
                        <input className="login-input" placeholder="Password" type="text" name="pass" required />
                    </div>
                    <div className="forgot-password">
                        <p className="forgot-password-text">Forgot Password?</p>
                    </div>
                    <button className="login-submit-button">Log In</button>
                    <p>Don't have an account yet? <span className="sign-up-from-login" onClick={() => {navigate('/signup')}}>Sign Up</span></p>
                </div>
            </form>
        </div>
    );
}

export default LogIn;