import { RuxIcon } from "@astrouxds/react";
import { Contact } from "../../../Types";

import "./ContactDetails.css";
// import { getJulianDay } from "../../../data/utils";

type PropTypes = {
  contact: Contact;
};

const ContactDetails = ({ contact }: PropTypes) => {
  return (
    <div className="contact-details-wrapper">
      <div className="contact-details-grid">
        <RuxIcon
          icon="schedule"
          size="1.4rem"
          className="contact-details-icon schedule-icon"
        />
        <p className="col-2 row-1">Next Pass</p>
        <p className="col-2 row-2">AOS</p>
        <p className="col-2 row-3">LOS</p>
        <p className="col-2 row-4">State</p>
        <p className="col-3 row-1 rux-body-1-bold">
          {/* {getJulianDay(new Date(contact.beginTimestamp))} */}
        </p>
        <p className="col-3 row-2 rux-body-1-bold">
          {new Date(contact.aos).toTimeString().slice(0, 8)}
        </p>
        <p className="col-3 row-3 rux-body-1-bold">
          {new Date(contact.los).toTimeString().slice(0, 8)}
        </p>
        <p
          style={{ textTransform: "capitalize" }}
          className="col-3 row-4 rux-body-1-bold"
        >
          {contact.state}
        </p>
      </div>
      <div className="contact-details-grid">
        <RuxIcon
          icon="antenna-off"
          size="2rem"
          className="contact-details-icon antenna-icon"
        />
        <p className="col-2 row-1">Ground Station</p>
        <p className="col-2 row-2">Azimuth</p>
        <p className="col-2 row-3">Elevation</p>
        <p className="col-3 row-1 rux-body-1-bold">{contact.ground}</p>
        <p className="col-3 row-2 rux-body-1-bold">{contact.azimuth}&deg;</p>
        <p className="col-3 row-3 rux-body-1-bold">
          {contact.elevation.toString().slice(0, 8)}
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;
