import Alerts from "./Components/Alerts/Alerts";
import Constellation from "./Components/Constellation";
import Watcher from "./Components/Watcher";
import GlobalStatusBar from "./Components/GlobalStatusBar";
import { AlertsContextProvider } from "./hooks/useAlerts";

import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <AlertsContextProvider>
        <GlobalStatusBar />
        <div className="background">
          <Alerts />
          <Constellation />
          <Watcher />
        </div>
      </AlertsContextProvider>
    </div>
  );
}

export default App;
