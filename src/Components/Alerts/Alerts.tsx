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
import "./Alerts.css";

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
      <div slot="header" className="header">
        <div className="active-alerts">
          <span className="alerts-num">{alertIds.length}</span> Active Alerts
        </div>
        <div className="select-menu-div">
          <RuxSelect
            value={severitySelection}
            onRuxchange={severitySelectionHandler}
            size="small"
            label="Severity"
            className="severity-select"
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
            className="category-select"
          >
            <RuxOption label="All" value="all" />
            <RuxOption label="Hardware" value="hardware" />
            <RuxOption label="Software" value="software" />
            <RuxOption label="Spacecraft" value="spacecraft" />
          </RuxSelect>
        </div>
      </div>
      <RuxNotification open={openBanner} small hide-close>
        One or more filters selected.
        <RuxButton
          onClick={handleClearFilter}
          secondary
          borderless
          size="small"
        >
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
