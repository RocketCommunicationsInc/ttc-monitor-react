import { RuxContainer, RuxSelect, RuxOption } from "@astrouxds/react";
import AlertsList from "./AlertsList";

const styles = {
  activeAlerts: {
    flex: "auto",
    display: "flex",
    flexFlow: "column nowrap",
    fontSize: "16px",
  },
  selectMenusDiv: {
    marginLeft: "auto",
    display: "flex",
  },
  alertsNum: {
    fontSize: "44px",
    fontWeight: "bold",
  },
};

const Alerts = () => {
  return (
    <RuxContainer className="alerts">
      <div
        slot="header"
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "auto",
        }}
      >
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>123</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect
            size="small"
            label="Severity"
            style={{ width: "6rem", marginRight: "1rem" }}
          >
            <RuxOption label="All" value=""></RuxOption>
            <RuxOption label="Critical" value=""></RuxOption>
            <RuxOption label="Caution" value=""></RuxOption>
            <RuxOption label="Serious" value=""></RuxOption>
          </RuxSelect>

          <RuxSelect size="small" label="Category" style={{ width: "6rem" }}>
            <RuxOption label="All" value=""></RuxOption>
            <RuxOption label="Hardware" value=""></RuxOption>
            <RuxOption label="Software" value=""></RuxOption>
            <RuxOption label="Spacecraft" value=""></RuxOption>
          </RuxSelect>
        </div>
      </div>
      <AlertsList />
    </RuxContainer>
  );
};

export default Alerts;
