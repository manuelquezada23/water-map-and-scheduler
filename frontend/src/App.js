import Main from './Main.js';
import NavigationBar from './components/NavigationBar';
import BottomBar from './components/BottomBar'
import React from 'react';
import { BrowserRouter } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6BOgfIKoXiI_lpZlNLFXFx3Eum35N0vs",
  authDomain: "cs32-term-project-spring-2022.firebaseapp.com",
  projectId: "cs32-term-project-spring-2022",
  storageBucket: "cs32-term-project-spring-2022.appspot.com",
  messagingSenderId: "259055541154",
  appId: "1:259055541154:web:3095120cffef0d594c30fb",
  measurementId: "G-9MKZ2VSG47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigationBar />
        <Main />
        <BottomBar />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
