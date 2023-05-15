import {
  RuxTableCell,
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
  RuxTableRow,
} from "@astrouxds/react";
import { Alert } from "../../Types";
import useAlerts from "../../hooks/useAlerts";

const styles = {
  accordianLabel: {
    color: "var(--color-palette-neutral-000)",
  },
  checkboxes: {
    paddingRight: "var(--spacing-4)",
  },
  alertMessage: {
    minWidth: "9rem",
    maxWidth: "9rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  alertCategory: {
    width: "4.75rem",
    alignSelf: "center",
    paddingLeft: "1.1rem",
  },
  alertTime: {
    width: "1.7rem",
    paddingLeft: ".6rem",
    alignSelf: "left",
  },
  investigateBtn: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "var(--spacing-2)",
  },
};

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const { toggleSelected } = useAlerts();


  const checkboxHandler = () => {
    toggleSelected(alertItem.id);
    if (alertItem.selected) {
      alertItem.selected = false;
    } else {
      alertItem.selected = true;
    }
  };

  const investigateHandler = () => {
    alert("This feature has not been implemented.");
  };

  return (
    <RuxAccordion>
      <RuxAccordionItem id={alertItem.id} className="accordion-item">
        {alertItem.message} <br />
        <RuxButton onClick={investigateHandler} style={styles.investigateBtn}>
          Investigate
        </RuxButton>
        <div slot="label" style={styles.accordianLabel}>
          <RuxTableRow>
            <RuxTableCell style={{ textAlign: "center" }}>
              <RuxCheckbox
                id={alertItem.id}
                style={styles.checkboxes}
                className="checkboxes"
                checked={alertItem.selected}
                onRuxchange={checkboxHandler}
              />
            </RuxTableCell>
            <RuxTableCell>
              <RuxStatus status={alertItem.status} />
            </RuxTableCell>
            <RuxTableCell style={styles.alertMessage}>
              {alertItem.message}
            </RuxTableCell>
            <RuxTableCell style={styles.alertCategory}>
              {alertItem.category}
            </RuxTableCell>
            <RuxTableCell style={styles.alertTime}>
              {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
            </RuxTableCell>
          </RuxTableRow>
        </div>
      </RuxAccordionItem>
    </RuxAccordion>
  );
};

export default AlertListItem;
