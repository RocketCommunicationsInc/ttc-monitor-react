import React from 'react';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxContainer } from "@astrouxds/react"

import './App.css';

function App() {
  return (
    <div className="App">
      <RuxContainer>
      Hello World
      </RuxContainer>

    </div>
  );
}

export default App;
