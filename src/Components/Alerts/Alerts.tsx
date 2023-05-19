import { useEffect, useState } from "react";
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

  const severitySelectionHandler = (e: any) => {
    setSeveritySelection(e.target.value);
  };

  const categorySelectionHandler = (e: any) => {
    setCategorySelection(e.target.value);
  };

  useEffect(() => {
    setOpenBanner(false);
    if (severitySelection !== "all" || categorySelection !== "all")
      setOpenBanner(true);
  }, [severitySelection, categorySelection]);

  const handleClearFilter = () => {
    setSeveritySelection("all");
    setCategorySelection("all");
    setOpenBanner(false);
  };

  return (
    <RuxContainer className="alerts">
      <div slot="header" style={styles.header}>
        <div style={styles.activeAlerts}>
          <span style={styles.alertsNum}>{alertIds.length}</span> Active Alerts
        </div>
        <div style={styles.selectMenusDiv}>
          <RuxSelect
            value={severitySelection}
            onRuxchange={severitySelectionHandler}
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
            onRuxchange={categorySelectionHandler}
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
      <RuxNotification open={openBanner} small hide-close style={styles.notificationBanner}>
        One or more filters selected.
        <RuxButton onClick={handleClearFilter} secondary borderless size="small">
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
