import { useState } from "react";
import {
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
  RuxNotification,
} from "@astrouxds/react";
import { useTTCGRMActions } from "@astrouxds/mock-data";
import type { Alert } from "@astrouxds/mock-data";

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const { modifyAlert } = useTTCGRMActions();
  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alertItem.selected });
  const [openBanner, setOpenBanner] = useState(false);

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
        <RuxAccordionItem id={alertItem.id}>
          <div className="accordion-item__content">
            <div>{alertItem.message}</div>
            <RuxButton icon="launch" onClick={() => setOpenBanner(true)}>
              Investigate
            </RuxButton>
          </div>
          <div slot="label" className="alert-list-label">
            <RuxCheckbox
              id={alertItem.id}
              checked={alertItem.selected}
              onRuxinput={() => toggleSelected(alertItem)}
            />
            <RuxStatus status={alertItem.status} />
            <span>{alertItem.message}</span>
            <span>{alertItem.category}</span>
            <span>
              {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
            </span>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </li>
  );
};

export default AlertListItem;
