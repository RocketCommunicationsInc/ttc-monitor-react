import Alerts from "./Components/Alerts/Alerts";
import Constellation from "./Components/Constellation/Constellation";
import Watcher from "./Components/Watcher/Watcher";
import GlobalStatusBar from "./Components/GlobalStatusBar";
import { AlertsContextProvider } from "./hooks/useAlerts";
import { ContactsContextProvider } from "./hooks/useContacts";

import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css";
import "./App.css";
import RootStateProvider from "./Components/RootStateProvider";
import TestComponent from "./Components/TestComponent";
import TestRootComponent from "./Components/TestRootComponent";

function App() {
  return (
    <RootStateProvider>
      <div className="app-container">
        {/* <TestComponent /> */}
        <TestRootComponent />
        <ContactsContextProvider>
          <GlobalStatusBar />
          <div className="background">
            <AlertsContextProvider>
              <Alerts />
            </AlertsContextProvider>
            <Constellation />
            <Watcher />
          </div>
        </ContactsContextProvider>
      </div>
    </RootStateProvider>
  );
}

export default App;
