import {
  RuxTableCell,
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
  RuxTableRow,
  RuxNotification,
} from "@astrouxds/react";
import { Alert } from "../../Types";
import useAlerts from "../../hooks/useAlerts";
import { useState } from "react";
import "./AlertListItem.css";

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const { toggleSelected } = useAlerts();
  const [openBanner, setOpenBanner] = useState(false);

  const checkboxHandler = () => {
    toggleSelected(alertItem.id);
    if (alertItem.selected) {
      alertItem.selected = false;
    } else {
      alertItem.selected = true;
    }
  };

  const investigateHandler = () => {
    setOpenBanner(true);
  };

  return (
    <>
      <RuxNotification
        small
        closeAfter={3}
        onRuxclosed={() => setOpenBanner(false)}
        open={openBanner}
      >
        This feature has not been implemented.
      </RuxNotification>
      <RuxAccordion>
        <RuxAccordionItem id={alertItem.id} className="accordion-item">
          {alertItem.message} <br />
          <div className="investigate-btn">
            <RuxButton icon="launch" onClick={investigateHandler}>
              Investigate
            </RuxButton>
          </div>
          <div slot="label" className="accordion-label">
            <RuxTableRow>
              <RuxTableCell className="checkbox-cell">
                <RuxCheckbox
                  id={alertItem.id}
                  className="checkboxes"
                  checked={alertItem.selected}
                  onRuxchange={checkboxHandler}
                />
              </RuxTableCell>
              <RuxTableCell className="status">
                <RuxStatus status={alertItem.status} />
              </RuxTableCell>
              <RuxTableCell className="alert-message">
                {alertItem.message}
              </RuxTableCell>
              <RuxTableCell className="alert-category">
                {alertItem.category}
              </RuxTableCell>
              <RuxTableCell className="alert-time">
                {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
              </RuxTableCell>
            </RuxTableRow>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </>
  );
};

export default AlertListItem;
