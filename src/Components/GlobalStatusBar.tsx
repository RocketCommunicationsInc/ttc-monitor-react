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
} from "@astrouxds/react";
import { rowDataValue } from "../Types/types";

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
  const [status1, setStatus1] = useState("off");
  const [status2, setStatus2] = useState("normal");
  const [status3, setStatus3] = useState("critical");
  const [notifications1, setNotifications1] = useState(0);
  const [notifications2, setNotifications2] = useState(2);
  const [notifications3, setNotifications3] = useState(4);

  const popupMenuHandler = () => {
    alert("This feature has not been implemented.");
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
      setStatus1(statusValuesArr[randomStatus] as rowDataValue);
      setStatus2(statusValuesArr[randomStatus2] as rowDataValue);
      setStatus3(statusValuesArr[randomStatus3] as rowDataValue);

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
          <RuxMenuItem onClick={popupMenuHandler}>Preferences</RuxMenuItem>
          <RuxMenuItem onClick={popupMenuHandler}>Sign Out</RuxMenuItem>
        </RuxMenu>
      </RuxPopUp>
      <RuxClock style={styles.clock} />

      <div style={styles.statusIndicators}>
        <RuxTooltip title={`Ground ${notifications1}`}>
          <RuxPopUp placement="bottom">
            <RuxMenu>
              <RuxMenuItem onClick={popupMenuHandler}>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status1 as rowDataValue}
              icon="antenna-off"
              label="Ground"
              notifications={notifications1}
              style={styles.monitorIcons}
              slot="trigger"
            ></RuxMonitoringIcon>
          </RuxPopUp>
        </RuxTooltip>

        <RuxTooltip title={`Comms ${notifications2}`}>
          <RuxPopUp placement="bottom">
            <RuxMenu>
              <RuxMenuItem onClick={popupMenuHandler}>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status2 as rowDataValue}
              icon="antenna-receive"
              label="Comms"
              notifications={notifications2}
              style={styles.monitorIcons}
              slot="trigger"
            />
          </RuxPopUp>
        </RuxTooltip>

        <RuxTooltip title={`Software ${notifications3}`}>
          <RuxPopUp placement="bottom">
            <RuxMenu>
              <RuxMenuItem onClick={popupMenuHandler}>Investigate</RuxMenuItem>
            </RuxMenu>
            <RuxMonitoringIcon
              status={status3 as rowDataValue}
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
  );
};

export default GlobalStatusBar;
