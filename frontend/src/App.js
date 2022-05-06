import Main from './Main.js';
import NavigationBar from './components/NavigationBar';
import BottomBar from './components/BottomBar'
import React, { useEffect } from 'react';
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

function App() {
  //server
  componentDidMount()
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

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

function componentDidMount() {
  callBackendAPI()
    .then(res => console.log(res.express))
    .catch(err => console.log(err));
}

async function callBackendAPI() {
  const response = await fetch('/express_backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

export default App;
