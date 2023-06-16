import { RuxIcon } from "@astrouxds/react";
import PassPlanItem, { PassPlanMnemonic } from "./PassPlanItem";
import { getJulianDay } from "../../../utils";
import type { Contact } from "@astrouxds/mock-data";

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
      <div className="rux-tree-header">
        <span>Step</span>
        <span>Command</span>
        <span>Run Length</span>
      </div>
      <div className="pass-plan-list">
        <ul>
          {passPlan.map((step) => (
            <PassPlanItem item={step} key={step.step} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PassPlan;
