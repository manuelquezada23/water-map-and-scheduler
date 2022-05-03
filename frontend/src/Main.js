import { Routes, Route, Navigate } from "react-router-dom";
import Home from './main-pages/Home'
import About from './main-pages/About'
import Map from './main-pages/Map'
import Contact from './main-pages/Contact'
import PageNotFound from './main-pages/PageNotFound'
import LogIn from './main-pages/LogIn'
import SignUp from './main-pages/SignUp'
import UserProfile from "./main-pages/UserProfile";
import Schedule from "./main-pages/Schedule";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import ForgotPassword from "./components/ForgotPassword";

function Main() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            }
        });
    })

    console.log(isLoggedIn)

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/map" element={<Map />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LogIn />}></Route>
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}></Route>
            <Route path="/user-profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}></Route>
            <Route path="/schedule" element={isLoggedIn ? <Schedule /> : <Navigate to="/" />}></Route>
            <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    );
}

export default Main;
