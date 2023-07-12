import { useState, useEffect } from "react";
import {
  RuxGlobalStatusBar,
  RuxClock,
  RuxPopUp,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMonitoringIcon,
  RuxTooltip,
  RuxNotification,
} from "@astrouxds/react";
import type { Status } from "@astrouxds/mock-data";
import "./GlobalStatusBar.css";
import { RuxMenuCustomEvent } from "@astrouxds/astro-web-components";

const GlobalStatusBar = () => {
  const [status1, setStatus1] = useState<Status>("off");
  const [status2, setStatus2] = useState<Status>("standby");
  const [status3, setStatus3] = useState<Status>("normal");
  const [notifications1, setNotifications1] = useState(0);
  const [notifications2, setNotifications2] = useState(2);
  const [notifications3, setNotifications3] = useState(4);
  const [lightTheme, setLightTheme] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);

  const statusValuesArr = [
    "off",
    "caution",
    "critical",
    "normal",
    "serious",
    "standby",
  ];

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
    }, 3000);
    return () => clearInterval(interval);
  });

  function menuSelect(e: RuxMenuCustomEvent<HTMLRuxMenuItemElement>) {
    if (e.detail.value === "themeToggle") {
      setLightTheme(!lightTheme);
      document.body.classList.toggle("light-theme");
      return;
    }
    setOpenBanner(true);
  }

  return (
    <>
      <RuxNotification
        small
        closeAfter={3}
        onRuxclosed={() => setOpenBanner(false)}
        open={openBanner}
      >
        This feature has not been implemented.
      </RuxNotification>
      <RuxGlobalStatusBar
        appDomain="TT&C"
        appName="MONITOR"
        username="J. Smith"
      >
        <RuxPopUp placement="top-start" slot="left-side" closeOnSelect>
          <RuxIcon slot="trigger" size="small" icon="apps" />
          <RuxMenu onRuxmenuselected={(e) => menuSelect(e)}>
            <RuxMenuItem value="themeToggle">
              {lightTheme ? "Dark" : "Light"} Theme
            </RuxMenuItem>
            <RuxMenuItem>Preferences</RuxMenuItem>
            <RuxMenuItem>Sign Out</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
        <RuxClock />

        <div className="status-indicators" slot="right-side">
          <RuxTooltip message={`Ground ${notifications1}`} placement="bottom">
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
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
          </RuxTooltip>

          <RuxTooltip message={`Comms ${notifications2}`} placement="bottom">
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
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
          </RuxTooltip>

          <RuxTooltip message={`Software ${notifications3}`} placement="bottom">
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
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
          </RuxTooltip>
        </div>
      </RuxGlobalStatusBar>
    </>
  );
};

export default GlobalStatusBar;
