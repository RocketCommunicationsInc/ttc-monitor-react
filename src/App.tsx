import React from 'react';
import Alerts from "./Components/Alerts/Alerts"
import Constellation from './Components/Constellation';
import Watcher from './Components/Watcher';
import GlobalStatusBar from './Components/GlobalStatusBar';

import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import './App.css';

function App() {
  return (
    <div className="app-container">
      <GlobalStatusBar />
      <div className="background">
        <Alerts />
        <Constellation />
        <Watcher />
      </div>

    </div>
  );
}

export default App;
