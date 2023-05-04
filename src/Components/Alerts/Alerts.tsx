import { RuxContainer, RuxSelect, RuxOption } from "@astrouxds/react";
import AlertsList from "./AlertsList";

const styles = {
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
  }
};

const Alerts = () => {
  return (
    <RuxContainer className="alerts">
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>123</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect size="small" label="Severity" style={styles.select1}>
            <RuxOption label="All" value=""></RuxOption>
            <RuxOption label="Critical" value=""></RuxOption>
            <RuxOption label="Caution" value=""></RuxOption>
            <RuxOption label="Serious" value=""></RuxOption>
          </RuxSelect>

          <RuxSelect size="small" label="Category" style={styles.select2}>
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
