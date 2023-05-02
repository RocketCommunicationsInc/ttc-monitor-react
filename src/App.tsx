import React from 'react';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxContainer } from "@astrouxds/react"
import GlobalStatusBar from './Components/GlobalStatusBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <GlobalStatusBar/>
      <RuxContainer>
      </RuxContainer>

    </div>
  );
}

export default App;
