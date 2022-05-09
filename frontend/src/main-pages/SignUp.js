import React, { useState } from 'react';
import logo from '../logo.png';
import './main-pages.css'
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function createUserInDatabase(id, name, email, key) {
    const sqlCommand = "INSERT INTO users VALUES (" + "'" + id + "'" + "," + "'" + name + "'" + "," + "'" + email + "'" + "," + "'" + key + "'" + ",'unknown');"

    const postParameters = {
        sql: sqlCommand
    }

    fetch('http://localhost:4567/get-sql-rs', {
        method: 'POST',
        body: JSON.stringify(postParameters),
        headers: { 'Access-Control-Allow-Origin': '*' },
    })
        .then((response) => response.json())
        .then((data) => { })
        // .then((data: tableInfo) => updateTable(data))
        .catch((error) => console.error("Error:", error))
}

function SignUp() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    function signUp(event) {
        event.preventDefault();
        if ((name.length !== 0 && email.length !== 0 && password.length !== 0 && confirmPassword !== 0) && (password === confirmPassword)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    updateProfile(userCredential.user, {
                        displayName: name
                    }).then(() => {
                        createUserInDatabase(userCredential.user.uid, name, userCredential.user.email, password)
                        navigate('/')
                    }).catch((error) => {
                        window.alert(error.message)
                    });
                })
                .catch((error) => {
                    // Not signed in
                    window.alert(error.message)
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                });
        } else if ((email.length !== 0 && password.length !== 0 && confirmPassword !== 0) && (password !== confirmPassword)) {
            window.alert("Passwords provided do not match.")
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div className="login">
            <img onClick={() => {
                navigate("/")
            }} src={logo} className="login-logo" alt="logo" />
            <p className="login-header">Sign Up for Water</p>
            <form>
                <div className="login-input-boxes">
                    <div>
                        <input value={name} className="login-input" placeholder="Name" type="text" onChange={e => setName(e.target.value)} required />
                    </div>
                    <div>
                        <input value={email} className="login-input" placeholder="Email" type="text" name="uname" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <input value={password} className="login-input" placeholder="Password" type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <input value={confirmPassword} className="login-input" placeholder="Confirm Password" type="password" name="pass" onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-submit-button" onClick={e => { signUp(e) }}>Sign Up</button>
                    <p>Already have an account? <span className="sign-up-from-login" onClick={() => { navigate('/login') }}>Log in</span></p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;