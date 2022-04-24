import Main from './Main.js';
import NavigationBar from './components/NavigationBar';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Main />
    </React.Fragment>
  );
}

export default App;
