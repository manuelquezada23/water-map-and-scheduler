import Main from './Main.js';
import NavigationBar from './components/NavigationBar';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

function App() {
  componentDidMount()
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigationBar />
        <Main />
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
