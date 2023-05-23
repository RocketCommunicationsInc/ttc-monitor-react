import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxIcon,
} from "@astrouxds/react";
import PassPlanItem, { PassPlanMnemonic } from "./PassPlanItem";
import { getJulianDay } from "../../../data/utils";
import { Contact } from "../../../Types";

type PropTypes = {
  contact: Contact;
  passPlan: PassPlanMnemonic[];
};

const PassPlan = ({ contact, passPlan }: PropTypes) => {
  return (
    <div className="pass-plan-wrapper">
      <div className="next-pass-time">
        <RuxIcon icon="schedule" size="1.4rem" />
        {`Next Pass: ${getJulianDay(new Date(contact.aos))}`} &nbsp;
        {`AOS: ${new Date(contact.aos).toTimeString().slice(0, 8)}`}
      </div>
      <RuxTable style={{ borderBottom: "none" }}>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>
              <span style={{ marginRight: "3.5rem" }}>Step</span>
              <span style={{ marginRight: "10.5rem" }}>Command</span>
              <span>Run Length</span>
            </RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {passPlan.map((step) => (
            <PassPlanItem item={step} key={step.step} />
          ))}
        </RuxTableBody>
      </RuxTable>
    </div>
  );
};

export default PassPlan;
