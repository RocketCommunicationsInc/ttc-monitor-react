import Alerts from "./Components/Alerts/Alerts";
import Constellation from "./Components/Constellation/Constellation";
import Watcher from "./Components/Watcher/Watcher";
import GlobalStatusBar from "./Components/GlobalStatusBar";
import { TTCGRMProvider } from "@astrouxds/mock-data";

import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "./App.css";

const options = {
  alertsPercentage: 50 as const,
  initial: 15,
  interval: 2,
  limit: 45,
};

function App() {
  return (
    <div className="app-container">
      <TTCGRMProvider options={options}>
        <GlobalStatusBar />
        <div className="background">
          <Alerts />
          <Constellation />
          <Watcher />
        </div>
      </TTCGRMProvider>
    </div>
  );
}

export default App;
