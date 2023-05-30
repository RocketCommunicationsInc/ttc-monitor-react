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

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const { toggleSelected } = useAlerts();
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
              onRuxinput={() => toggleSelected(alertItem.id)}
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
