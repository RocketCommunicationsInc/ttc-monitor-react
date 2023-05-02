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
    marginLeft: "28rem",
    marginRight: "auto",
  },
  indicator: {
    width: "108px",
    margin: "0 auto",
    padding: "0 10px",
    display: "inline-block",
  },
  clock: {
    marginLeft: "28rem"
  }, 
  popUp: {
    position: "fixed",
    top: "93.3984375px",
    left: "1317.9921875px",
    zIndex: "10000",
  }, 
  monitorIcons: {
    marginInline: ".5rem"
  }
};

const GlobalStatusBar = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [status, setStatus] = useState(0);
  const [notifications, setNotifications] = useState(0);

  const iconStatusHanlder = () => {
    // alert("hello")
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
     const randomStatus = Math.floor(Math.random() * (statusValuesArr.length))
      setStatus(statusValuesArr[randomStatus] as any)
    }, 3000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
     const randomNumber = Math.floor(Math.random() * (notificationsArr.length))
   setNotifications(notificationsArr[randomNumber])
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
      <RuxClock style={styles.clock}/>

      <div style={styles.statusIndicators} >
        <RuxMonitoringIcon
          status={status as any}
          icon="antenna-off"
          label="Ground"
          notifications={notifications}
          onClick={iconStatusHanlder}
          style={styles.monitorIcons}
          >
          {showPopUp && ( 
          <RuxPopUp
            style={styles.popUp}
          >
            <RuxMenu>
              <RuxMenuItem>Investigate</RuxMenuItem>
            </RuxMenu>
          </RuxPopUp>
          )}
        </RuxMonitoringIcon>

        <RuxMonitoringIcon
          status={status as any}
          icon="antenna-receive"
          label="Comms"
          notifications={notifications}
          style={styles.monitorIcons}
        />
        <RuxMonitoringIcon
          status={status as any}
          icon="processor"
          label="Software"
          notifications={notifications}
          style={styles.monitorIcons}
        />
      </div>

    </RuxGlobalStatusBar>
  );
};

export default GlobalStatusBar;
