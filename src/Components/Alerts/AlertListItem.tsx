import {
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
  RuxNotification,
} from "@astrouxds/react";
import { Alert } from "../../Types";
import useAlerts from "../../hooks/useAlerts";
import { useState } from "react";

const styles = {
  accordianLabel: {
    color: "var(--color-palette-neutral-000)",
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
  const [openBanner, setOpenBanner] = useState(false);

  const checkboxHandler = () => {
    if (alertItem.selected) {
      alertItem.selected = false;
      //toggleSelected(alertItem.id);
    } else {
      alertItem.selected = true;
      //toggleSelected(alertItem.id);
    }
  };

  const investigateHandler = () => {
    setOpenBanner(true);
  };

  return (
    <li>
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
          <div style={styles.investigateBtn}>
            <RuxButton icon="launch" onClick={investigateHandler}>
              Investigate
            </RuxButton>
          </div>
          <div slot="label" style={styles.accordianLabel}>
            <div className="alert-list-label">
              <div>
                <RuxCheckbox
                  id={alertItem.id}
                  checked={alertItem.selected}
                  onRuxchange={checkboxHandler}
                />
              </div>
              <div className="message-status-column">
                <div className="status">
                  <RuxStatus status={alertItem.status} />
                </div>
                <div className="alert-message">{alertItem.message}</div>
              </div>
              <div className="category-time-column">
                <div className="alert-category">{alertItem.category}</div>
                <div className="alert-time">
                  {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
                </div>
              </div>
            </div>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </li>
  );
};

export default AlertListItem;
