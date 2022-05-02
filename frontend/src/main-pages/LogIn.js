import React, { useState } from 'react';
import logo from '../logo.png';
import './main-pages.css'
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    function logIn(event) {
        event.preventDefault();
        if (email.length !== 0 && password.length !== 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Signed in 
                    navigate('/')
                })
                .catch((error) => {
                    // Not signed in
                    window.alert(error.message)
                    setEmail('')
                    setPassword('')
                });
        }
    }

    return (
        <div className="login">
            <img onClick={() => { navigate("/") }} src={logo} className="login-logo" alt="logo" />
            <p className="login-header">Welcome to Water</p>
            <form>
                <div className="login-input-boxes">
                    <div>
                        <input value={email} className="login-input" placeholder="Email" type="text" name="uname" id="email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input value={password} className="login-input" placeholder="Password" type="password" name="pass" id="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="forgot-password">
                        <p className="forgot-password-text">Forgot Password?</p>
                    </div>
                    <button type="submit" className="login-submit-button" onClick={e => { logIn(e) }}>Log In</button>
                    <p>Don't have an account yet? <span className="sign-up-from-login" onClick={() => { navigate('/signup') }}>Sign Up</span></p>
                </div>
            </form>
        </div>
    );
}

export default LogIn;