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
  footer: {
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid var(--logHeaderBackgroundColor, rgb(20, 32, 44))",
    boxShadow: " 0 -0.5rem 1.25rem rgba(0, 0, 0, 0.25)",
    width: "28.75rem",
    height: "3rem",
    padding: "2rem",
    position: "absolute" as "absolute",
    bottom: -2,
    backgroundColor: "#1B2D3E",
  },
};

const Alerts = () => {

  const [notificationBanner, setNotifcationBanner] = useState(false)

  const notification: any = document.getElementById("#notification")

const notificationHandler = () => {
    // notification?.addEventListener('ruxclosed', () => {
    //     }
    // )
   setNotifcationBanner(!notificationBanner)
}



  return (
    <RuxContainer className="alerts" style={styles.container}>
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>123</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect size="small" label="Severity" style={styles.select1}>
            <RuxOption label="All" value="" />
            <RuxOption label="Critical" value="" onClick={notificationHandler}/>
            <RuxOption label="Caution" value=""/>
            <RuxOption label="Serious" value=""/>
          
               <RuxNotification id="notification">
              You have one or more filters selected.
              <br />
              <RuxButton secondary borderless>
                Clear filters
              </RuxButton>
              to display all alerts.
            </RuxNotification>
         
          </RuxSelect>
          <RuxSelect size="small" label="Category" style={styles.select2}>
            <RuxOption label="All" value=""/>
            <RuxOption label="Hardware" value=""/>
            <RuxOption label="Software" value=""/>
            <RuxOption label="Spacecraft" value=""/>
          </RuxSelect>
        </div>
      </div>
      <AlertsList />
      <div style={styles.footer}>
        <RuxButton style={{ marginRight: "1rem" }}>Ackowledge</RuxButton>
        <RuxButton>Dismiss</RuxButton>
      </div>
    </RuxContainer>
  );
};

export default Alerts;
