import React, { useState } from 'react';
import logo from '../logo.png';
import '../main-pages/main-pages.css'
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const auth = getAuth();

    function logIn(event) {
        event.preventDefault();
        if (email.length !== 0) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    window.alert("Password reset email has been sent!")
                    navigate('/login')
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    window.alert(errorMessage);
                });
        }
    }

    return (
        <div className="login">
            <img onClick={() => { navigate("/") }} src={logo} className="login-logo" alt="logo" />
            <p className="login-header">Forgot Password?</p>
            <form>
                <div className="login-input-boxes">
                    <p style={{ marginTop: "-10px" }}>Please enter your email to search for your account:</p>
                    <div>
                        <input className="login-input" placeholder="Email" type="text" name="uname" id="email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-submit-button" onClick={e => { logIn(e) }}>Search</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;