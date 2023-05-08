import Alerts from "./Components/Alerts/Alerts";
import Constellation from "./Components/Constellation/Constellation";
import Watcher from "./Components/Watcher/Watcher";
import GlobalStatusBar from "./Components/GlobalStatusBar";
import { AlertsContextProvider } from "./hooks/useAlerts";
import { ContactsContextProvider } from "./hooks/useContacts";

import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <ContactsContextProvider>
        <AlertsContextProvider>
          <GlobalStatusBar />
          <div className="background">
            <Alerts />
            <Constellation />
            <Watcher />
          </div>
        </AlertsContextProvider>
      </ContactsContextProvider>
    </div>
  );
}

export default App;
