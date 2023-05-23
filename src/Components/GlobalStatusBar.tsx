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
import type { Status } from "../Types";

const styles = {
  statusIndicators: {
    display: "flex",
  },
  clock: {
    marginInline: "auto",
  },
  monitorIcons: {
    marginInline: "var(--spacing-3)",
  },
};

const GlobalStatusBar = () => {
  const [status1, setStatus1] = useState<Status>("off");
  const [status2, setStatus2] = useState<Status>("standby");
  const [status3, setStatus3] = useState<Status>("normal");
  const [notifications1, setNotifications1] = useState(0);
  const [notifications2, setNotifications2] = useState(2);
  const [notifications3, setNotifications3] = useState(4);
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
          <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
            <RuxMenuItem>Preferences</RuxMenuItem>
            <RuxMenuItem>Sign Out</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
        <RuxClock style={styles.clock} />

        <div style={styles.statusIndicators}>
          <RuxTooltip message={`Ground ${notifications1}`}>
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
                <RuxMenuItem>Investigate</RuxMenuItem>
              </RuxMenu>
              <RuxMonitoringIcon
                status={status1}
                icon="antenna-off"
                label="Ground"
                notifications={notifications1}
                style={styles.monitorIcons}
                slot="trigger"
              ></RuxMonitoringIcon>
            </RuxPopUp>
          </RuxTooltip>

          <RuxTooltip message={`Comms ${notifications2}`}>
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
                <RuxMenuItem>Investigate</RuxMenuItem>
              </RuxMenu>
              <RuxMonitoringIcon
                status={status2}
                icon="antenna-receive"
                label="Comms"
                notifications={notifications2}
                style={styles.monitorIcons}
                slot="trigger"
              />
            </RuxPopUp>
          </RuxTooltip>

          <RuxTooltip message={`Software ${notifications3}`}>
            <RuxPopUp placement="bottom" closeOnSelect>
              <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
                <RuxMenuItem>Investigate</RuxMenuItem>
              </RuxMenu>
              <RuxMonitoringIcon
                status={status3}
                icon="processor"
                label="Software"
                notifications={notifications3}
                style={styles.monitorIcons}
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
