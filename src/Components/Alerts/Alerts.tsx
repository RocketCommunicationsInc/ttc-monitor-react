import {
  RuxContainer,
  RuxSelect,
  RuxOption,
  RuxButton,
  RuxNotification,
} from "@astrouxds/react";
import AlertsList from "./AlertsList";
import { useState } from "react";
import useAlerts from "../../hooks/useAlerts";
import { Alert } from "../../Types";

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
    marginRight: "8rem",
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
    position: "sticky" as "sticky",
    zIndex: 50,
  },
};

const Alerts = () => {
  const { alertIds } = useAlerts();
  const [openBanner, setOpenBanner] = useState(false);
  const [selection, setSelection] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])

  const selectionHandler = (e: any) => {
    setSelection(e.target.value);
    setOpenBanner(true);
  };

  const handleClearFilter = () => {
    setSelection("All");
    setOpenBanner(false);
  };

  //have filtered state for the filtered alerts, have state for unfiltered alerts, then were going to pass that array of alerts right down to the list component. we wont need to map over the list, we just need to pass the array of filtered items to alert list component and then it will map over those. Since we don't have an item component, we just have a big list component. 
  //what makes it in to an alert list as a prop will never be anything from the hook. It will only be the filtered state. If we filter by none then we pass it all- either way we're passing filtered data. 


  return (
    <RuxContainer className="alerts" style={styles.container}>
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>{alertIds.length}</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect
            value={selection}
            onRuxchange={selectionHandler}
            size="small"
            label="Severity"
            style={styles.select1}
          >
            <RuxOption label="All" value="" />
            <RuxOption label="Critical" value="Critical" />
            <RuxOption label="Caution" value="Caution" />
            <RuxOption label="Serious" value="Serious" />
          </RuxSelect>

          <RuxSelect
            value={selection}
            onRuxchange={selectionHandler}
            size="small"
            label="Category"
            style={styles.select2}
          >
            <RuxOption label="All" value="" />
            <RuxOption label="Hardware" value="Hardware" />
            <RuxOption label="Software" value="Software" />
            <RuxOption label="Spacecraft" value="Spacecraft" />
          </RuxSelect>
        </div>
      </div>

      {selection && (
        <RuxNotification open={openBanner} style={styles.notificationBanner}>
          You have one or more filters selected. <br />
          <RuxButton onClick={handleClearFilter} secondary borderless>
            Clear filters
          </RuxButton>
          to display all alerts.
        </RuxNotification>
      )}
      <AlertsList selectValue={""} alertsArr={[]}/>
    </RuxContainer>
  );
};

export default Alerts;
