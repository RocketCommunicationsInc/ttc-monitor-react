import { useMemo, useCallback } from "react";
import { RuxCheckbox } from "@astrouxds/react";
import AlertListItem from "./AlertListItem";
import type { Category, Status } from "@astrouxds/mock-data";
import { useTTCGRMActions, useTTCGRMAlerts } from "@astrouxds/mock-data";

type PropTypes = {
  severitySelection: Status | "all";
  categorySelection: Category | "all";
};

const AlertsList = ({ severitySelection, categorySelection }: PropTypes) => {
  const { dataById: alerts } = useTTCGRMAlerts();
  const { allAlertsHaveProp, anyAlertsHaveProp, modifyAllAlerts } =
    useTTCGRMActions();
  const allSelected = allAlertsHaveProp("selected", true);
  const selectAll = () => modifyAllAlerts({ selected: true });
  const selectNone = () => modifyAllAlerts({ selected: false });
  const anySelected = anyAlertsHaveProp("selected", true);

  const filterAlerts = useCallback(
    (severity: Status | "all", category: Category | "all") => {
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
    },
    [alerts]
  );

  const filteredAlertIds = useMemo(() => {
    return filterAlerts(severitySelection, categorySelection).map(
      (alert) => alert.id
    );
  }, [filterAlerts, severitySelection, categorySelection]);

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
