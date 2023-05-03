import { useState, useEffect } from "react";
import {
  RuxGlobalStatusBar,
  RuxClock,
  RuxPopUp,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxMonitoringIcon,
  // RuxButton,
} from "@astrouxds/react";

const styles = {
  statusIndicators: {
    marginLeft: "27rem",
    marginRight: "auto",
  },
  indicator: {
    width: "108px",
    margin: "0 auto",
    padding: "0 10px",
    display: "inline-block",
  },
  clock: {
    marginLeft: "28rem",
  },
  popUp: {
    position: "fixed",
    top: "93.3984375px",
    left: "1317.9921875px",
    zIndex: "10000",
  },
  monitorIcons: {
    marginInline: ".5rem",
  },
};

const GlobalStatusBar = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(5);
  const [status3, setStatus3] = useState(3);
  const [notifications1, setNotifications1] = useState(0);
  const [notifications2, setNotifications2] = useState(2);
  const [notifications3, setNotifications3] = useState(4);

  const iconStatusHanlder = () => {
    setShowPopUp(true);
  };

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
      setStatus1(statusValuesArr[randomStatus] as any);
      setStatus2(statusValuesArr[randomStatus2] as any);
      setStatus3(statusValuesArr[randomStatus3] as any);
    }, 3000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
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
    <RuxGlobalStatusBar appDomain="TT&C" appName="MONITOR" username="J. Smith">
      <RuxPopUp placement="top-start" slot="left-side">
        <RuxIcon slot="trigger" size="small" icon="apps" />
        <RuxMenu>
          <RuxMenuItem>Preferences</RuxMenuItem>
          <RuxMenuItem>Sign Out</RuxMenuItem>
        </RuxMenu>
      </RuxPopUp>
      <RuxClock style={styles.clock} />

      <div style={styles.statusIndicators}>
        <RuxMonitoringIcon
          status={status1 as any}
          icon="antenna-off"
          label="Ground"
          notifications={notifications1}
          onClick={iconStatusHanlder}
          style={styles.monitorIcons}
        >
          {showPopUp && (
            <RuxPopUp style={styles.popUp}>
              <RuxMenu>
                <RuxMenuItem>Investigate</RuxMenuItem>
              </RuxMenu>
            </RuxPopUp>
          )}
        </RuxMonitoringIcon>

        <RuxMonitoringIcon
          status={status2 as any}
          icon="antenna-receive"
          label="Comms"
          notifications={notifications2}
          style={styles.monitorIcons}
        />
        <RuxMonitoringIcon
          status={status3 as any}
          icon="processor"
          label="Software"
          notifications={notifications3}
          style={styles.monitorIcons}
        />
      </div>
    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
