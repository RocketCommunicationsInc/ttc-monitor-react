/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxCheckbox,
} from "@astrouxds/react";
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
    <div className="table-wrapper">
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <RuxCheckbox
                onRuxchange={selectAllHandler}
                className="select-all-checkbox"
                checked={allSelected}
              />
            </RuxTableHeaderCell>
            {/* Status Placeholder */}
            <RuxTableHeaderCell></RuxTableHeaderCell>
            <RuxTableHeaderCell>Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Category</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {filteredAlertIds.map((alertId) => (
            <AlertListItem alertItem={alerts[alertId]} key={alertId} />
          ))}
        </RuxTableBody>
      </RuxTable>
    </div>
  );
};

export default AlertsList;
