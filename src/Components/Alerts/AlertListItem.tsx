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
        <RuxAccordionItem id={alertItem.id}>
          <div slot="label">
            <RuxTableRow>
              <RuxTableCell>
                <RuxCheckbox
                  id={alertItem.id}
                  checked={alertItem.selected}
                  onRuxchange={checkboxHandler}
                />
              </RuxTableCell>
              <RuxTableCell>
                <RuxStatus status={alertItem.status} />
              </RuxTableCell>
              <RuxTableCell>{alertItem.message}</RuxTableCell>
              <RuxTableCell>{alertItem.category}</RuxTableCell>
              <RuxTableCell>
                {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
              </RuxTableCell>
            </RuxTableRow>
          </div>
          {/* accordion item content */}
          <div className="accordion-item__content">
            <div>{alertItem.message}</div>
            <RuxButton icon="launch" onClick={investigateHandler}>
              Investigate
            </RuxButton>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </>
  );
};

export default AlertListItem;
