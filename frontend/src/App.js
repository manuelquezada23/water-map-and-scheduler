import Main from './Main.js';
import NavigationBar from './components/NavigationBar';
import BottomBar from './components/BottomBar'
import React from 'react';
import { BrowserRouter } from "react-router-dom";

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
