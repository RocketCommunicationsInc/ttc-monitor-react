import {
  RuxContainer,
  RuxSelect,
  RuxOption,
  RuxButton,
  RuxNotification,
} from "@astrouxds/react";
import AlertsList from "./AlertsList";
import { useState } from "react";

const styles = {
  container: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  activeAlerts: {
    flex: "auto",
    display: "flex",
    flexFlow: "column nowrap",
    fontSize: "var(--font-size-base)",
  },
  selectMenusDiv: {
    marginLeft: "auto",
    display: "flex",
  },
  alertsNum: {
    fontSize: "var(--font-size-5xl)",
    fontWeight: "var(--font-weights-bold)",
  },
  select1: {
    width: "var(--spacing-24)",
    marginRight: "var(--spacing-4)",
  },
  select2: {
    width: "var(--spacing-24)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    textAlign: "center" as "center",
    marginRight: "auto",
  },
  notificationBanner: {
    flexGrow: 1,
    position: "sticky" as "sticky",
    top: 0,
    left: 0,
    alignContent: "center",
    backgroundColor: "var(--colorPrimaryDarken1, rgb(0, 68, 107))",
    color: "var(--colorPrimaryLighten3, rgb(211, 234, 255))",
    padding: "0.5rem",
    textAlign: "center",
    width: "100%",
  },
};

const Alerts = () => {

  // const [notificationBanner, setNotifcationBanner] = useState(false);
  // const notification: any = document.getElementByClassName(".notificationBanner");

  const notificationHandler = () => {
    // return (
    //   <RuxNotification style={styles.notificationBanner} className="notificationBanner">
    //     You have one or more filters selected.
    //     <br />
    //     <RuxButton secondary borderless>
    //       Clear filters
    //     </RuxButton>
    //     to display all alerts.
    //   </RuxNotification>
    // );
  };

  return (
    <RuxContainer className="alerts" style={styles.container}>
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>123</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect size="small" label="Severity" style={styles.select1}>
            <RuxOption label="All" value="" />
            <RuxOption
              label="Critical"
              value=""
              onClick={notificationHandler}
            />
            <RuxOption label="Caution" value="" onClick={notificationHandler} />
            <RuxOption label="Serious" value="" onClick={notificationHandler} />
          </RuxSelect>
          <RuxSelect size="small" label="Category" style={styles.select2}>
            <RuxOption label="All" value="" />
            <RuxOption
              label="Hardware"
              value=""
              onClick={notificationHandler}
            />
            <RuxOption
              label="Software"
              value=""
              onClick={notificationHandler}
            />
            <RuxOption
              label="Spacecraft"
              value=""
              onClick={notificationHandler}
            />
          </RuxSelect>
        </div>
      </div>
      <AlertsList />
    </RuxContainer>
  );
};

export default Alerts;
