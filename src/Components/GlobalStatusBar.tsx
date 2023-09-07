import { useState, useEffect } from "react";
import {
  RuxGlobalStatusBar,
  RuxClock,
  RuxPopUp,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMenuItemDivider,
  RuxMonitoringIcon,
  RuxToastStack,
} from "@astrouxds/react";
import type { Status } from "@astrouxds/mock-data";
import { addToast } from "../utils";
import "./GlobalStatusBar.css";

const GlobalStatusBar = () => {
  const [status1, setStatus1] = useState<Status>("normal");
  const [status2, setStatus2] = useState<Status>("off");
  const [status3, setStatus3] = useState<Status>("normal");
  const [notifications1, setNotifications1] = useState(0);
  const [notifications2, setNotifications2] = useState(2);
  const [notifications3, setNotifications3] = useState(4);
  const [lightTheme, setLightTheme] = useState(false);

  const statusValuesArr = ["caution", "normal", "serious", "off"];

  const notificationsArr = [12, 14, 23, 42, 6, 37, 25, 38, 9];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomStatus = Math.floor(Math.random() * statusValuesArr.length);
      const randomStatus2 = Math.floor(Math.random() * statusValuesArr.length);
      const randomStatus3 = Math.floor(Math.random() * statusValuesArr.length);
      setStatus1(statusValuesArr[randomStatus] as Status);
      setStatus2(statusValuesArr[randomStatus2] as Status);
      setStatus3(statusValuesArr[randomStatus3] as Status);

      const randomNumber = Math.floor(Math.random() * notificationsArr.length);
      const randomNumber2 = Math.floor(Math.random() * notificationsArr.length);
      const randomNumber3 = Math.floor(Math.random() * notificationsArr.length);
      setNotifications1(notificationsArr[randomNumber]);
      setNotifications2(notificationsArr[randomNumber2]);
      setNotifications3(notificationsArr[randomNumber3]);
    }, 12000);
    return () => clearInterval(interval);
  });

  function menuSelect(e: CustomEvent) {
    const { detail } = e;
    if (detail.href) return;
    if (detail.value === "themeToggle") {
      setLightTheme(!lightTheme);
      document.body.classList.toggle("light-theme");
      return;
    }
    addToast("This feature has not been implemented", false, 3000);
  }

  return (
    <>
      <RuxToastStack />
      <RuxGlobalStatusBar
        appDomain="TT&C"
        appName="MONITOR"
        username="J. Smith"
        app-state="Demo"
        app-state-color="tag1"
      >
        <RuxPopUp
          className="app-icon-pop-up"
          placement="top-start"
          slot="left-side"
          closeOnSelect
        >
          <RuxIcon
            className="app-switcher-icon"
            slot="trigger"
            size="small"
            icon="apps"
          />
          <RuxMenu onRuxmenuselected={(e) => menuSelect(e)}>
            <RuxMenuItem href="https://ttc-command-react.netlify.app/">
              TTC Command & Investigate
            </RuxMenuItem>
            <RuxMenuItem href="#">TTC Monitor</RuxMenuItem>
            <RuxMenuItemDivider />
            <RuxMenuItem value="themeToggle">
              {lightTheme ? "Dark" : "Light"} Theme
            </RuxMenuItem>
            <RuxMenuItem>Preferences</RuxMenuItem>
            <RuxMenuItem>Sign Out</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
        <RuxClock />

        <div className="status-indicators" slot="right-side">
          <RuxPopUp placement="bottom" closeOnSelect>
            <RuxMenu
              onRuxmenuselected={() =>
                addToast("This feature has not been implemented", false, 3000)
              }
            >
              <RuxMenuItem>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status1}
              icon="antenna-off"
              label="Ground"
              notifications={notifications1}
              slot="trigger"
            ></RuxMonitoringIcon>
          </RuxPopUp>

          <RuxPopUp placement="bottom" closeOnSelect>
            <RuxMenu
              onRuxmenuselected={() =>
                addToast("This feature has not been implemented", false, 3000)
              }
            >
              <RuxMenuItem>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status2}
              icon="antenna-receive"
              label="Comms"
              notifications={notifications2}
              slot="trigger"
            />
          </RuxPopUp>

          <RuxPopUp placement="bottom" closeOnSelect>
            <RuxMenu
              onRuxmenuselected={() =>
                addToast("This feature has not been implemented", false, 3000)
              }
            >
              <RuxMenuItem>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status3}
              icon="processor"
              label="Software"
              notifications={notifications3}
              slot="trigger"
            />
          </RuxPopUp>
        </div>
      </RuxGlobalStatusBar>
    </>
  );
};

export default GlobalStatusBar;
