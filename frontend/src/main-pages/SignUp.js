import React from 'react';
import logo from '../logo.png';
import './main-pages.css'
import { useNavigate, useLocation } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    return (
        <div className="login">
            <img onClick={() => {
                navigate("/")
            }} src={logo} className="login-logo" alt="logo" />
            <p className="login-header">Sign Up for Water</p>
            <form>
                <div className="login-input-boxes">
                    <div>
                        <input className="login-input" placeholder="Email" type="text" name="uname" required />
                    </div>
                    <div>
                        <input className="login-input" placeholder="Password" type="password" name="pass" required />
                    </div>
                    <div>
                        <input className="login-input" placeholder="Confirm Password" type="password" name="pass" required />
                    </div>
                    <button className="login-submit-button">Sign Up</button>
                    <p>Already have an account? <span className="sign-up-from-login" onClick={() => {navigate('/login')}}>Log in</span></p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;