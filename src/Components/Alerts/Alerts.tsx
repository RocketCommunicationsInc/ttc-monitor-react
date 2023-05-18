import { useState } from "react";
import {
  RuxContainer,
  RuxSelect,
  RuxOption,
  RuxButton,
  RuxNotification,
} from "@astrouxds/react";
import AlertsList from "./AlertsList";
import useAlerts from "../../hooks/useAlerts";
import { Category, Status } from "../../Types";

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
  const [severitySelection, setSeveritySelection] = useState<Status | "all">(
    "all"
  );
  const [categorySelection, setCategorySelection] = useState<Category | "all">(
    "all"
  );

  const selectionHandler1 = (e: any) => {
    setSeveritySelection(e.target.value);
    if (severitySelection !== "all") {
      setOpenBanner(false);
    } else {
      setOpenBanner(true);
    }
  };

  const selectionHandler2 = (e: any) => {
    setCategorySelection(e.target.value);
    if (categorySelection !== "all") {
      setOpenBanner(false);
    } else {
      setOpenBanner(true);
    }
  };

  const handleClearFilter = () => {
    setSeveritySelection("all");
    setCategorySelection("all");
    setOpenBanner(false);
  };

  return (
    <RuxContainer className="alerts" style={styles.container}>
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>{alertIds.length}</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect
            value={severitySelection}
            onRuxchange={selectionHandler1}
            size="small"
            label="Severity"
            style={styles.select1}
          >
            <RuxOption label="All" value="all" />
            <RuxOption label="Critical" value="critical" />
            <RuxOption label="Caution" value="caution" />
            <RuxOption label="Serious" value="serious" />
          </RuxSelect>

          <RuxSelect
            value={categorySelection}
            onRuxchange={selectionHandler2}
            size="small"
            label="Category"
            style={styles.select2}
          >
            <RuxOption label="All" value="all" />
            <RuxOption label="Hardware" value="hardware" />
            <RuxOption label="Software" value="software" />
            <RuxOption label="Spacecraft" value="spacecraft" />
          </RuxSelect>
        </div>
      </div>
      <RuxNotification open={openBanner} style={styles.notificationBanner}>
        You have one or more filters selected. <br />
        <RuxButton onClick={handleClearFilter} secondary borderless>
          Clear filters
        </RuxButton>
        to display all alerts.
      </RuxNotification>
      <AlertsList
        severitySelection={severitySelection}
        categorySelection={categorySelection}
      />
    </RuxContainer>
  );
};

export default Alerts;
