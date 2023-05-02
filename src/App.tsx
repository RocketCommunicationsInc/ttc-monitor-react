import React from 'react';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import Alerts from "./Components/Alerts"
import Constellation from './Components/Constellation';
import Watcher from './Components/Watcher';
import NavBar from "./Components/NavBar";

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="background">
        <Alerts />
        <Constellation />
        <Watcher />
      </div>

    </div>
  );
}

export default App;
