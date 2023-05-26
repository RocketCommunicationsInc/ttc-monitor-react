/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { RuxCheckbox } from "@astrouxds/react";
import AlertListItem from "./AlertListItem";
import useAlerts from "../../hooks/useAlerts";
import { Category, Status } from "../../Types";

type PropTypes = {
  severitySelection: Status | "all";
  categorySelection: Category | "all";
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const {
    alerts,
    initialize,
    selectAll,
    selectNone,
    stopGenerating,
    generate,
    allSelected,
    anySelected,
  } = useAlerts();

  useEffect(() => {
    initialize();
    generate();

    return () => {
      stopGenerating();
    };
  }, []);

  const filterAlerts = (
    severity: Status | "all",
    category: Category | "all"
  ) => {
    const alertsArray = Object.values(alerts);
    const filteredForSeverityAlerts =
      severity !== "all"
        ? alertsArray.filter((alert) => alert.status === severity)
        : alertsArray;
    const filteredForCategoryAlerts =
      category !== "all"
        ? filteredForSeverityAlerts.filter(
            (alert) => alert.category === category
          )
        : filteredForSeverityAlerts;
    return filteredForCategoryAlerts;
  };

  const filteredAlertIds = useMemo(() => {
    return filterAlerts(severitySelection, categorySelection).map(
      (alert) => alert.id
    );
  }, [severitySelection, categorySelection, alerts]);

  const selectAllHandler = (e: CustomEvent) => {
    const checkbox = e.target as HTMLRuxCheckboxElement;
    if (checkbox.checked === true) {
      selectAll();
    } else {
      selectNone();
    }
  };

  return (
    <>
      <div className="alert-list-headers">
        <RuxCheckbox
          className="select-all-checkbox"
          onRuxchange={selectAllHandler}
          checked={allSelected}
          indeterminate={anySelected && !allSelected}
        />
        <span>Message</span>
        <span>Category</span>
        <span>Time</span>
      </div>
      <ul className="alert-list">
        {filteredAlertIds.map((alertId) => (
          <AlertListItem alertItem={alerts[alertId]} key={alertId} />
        ))}
      </ul>
    </>
  );
};

export default AlertsList;
