import {
  RuxTimeline,
  RuxTrack,
  RuxTimeRegion,
  RuxRuler,
  RuxStatus,
} from "@astrouxds/react";
import useContacts from "../../hooks/useContacts";
import { faker } from "@faker-js/faker";
import { ContactOptions } from "../../Types";
import { randomMinutes } from "../../data/utils";


type PropTypes = {
  zoomLevel: number;
  toggleDrawer: (id?: string) => void;
  options?: ContactOptions
};

const ConstellationTimeline = ({ zoomLevel, toggleDrawer, options }: PropTypes) => {
  const { contacts, contactIds } = useContacts();

 const time = faker.date.recent(options?.daysRange, options?.dateRef).getTime()
 const startTimeISO = new Date(time - randomMinutes(0, 20)).toISOString();
 const endTimeISO = new Date(time + randomMinutes(800, 800)).toISOString()
 const playheadISO = new Date(time + randomMinutes(50, 60)).toISOString()

  return (
    <div className="timeline-wrapper">
      <RuxTimeline
        timezone="UTC"
        start={startTimeISO}
        end={endTimeISO}
        playhead={playheadISO}
        interval="hour"
        zoom={zoomLevel}
      >
        {contactIds.map((contactId) => {
          const startDate = new Date(
            contacts[contactId].beginTimestamp
          ).toISOString();
          const endDate = new Date(
            contacts[contactId].endTimestamp
          ).toISOString();
          return (
            <RuxTrack>
              <div slot="label" style={{ display: "flex" }}>
                <RuxStatus
                  style={{ paddingRight: ".5rem" }}
                  status={contacts[contactId].status}
                />
                {contacts[contactId].satellite.slice(4, 10)}
              </div>
              <RuxTimeRegion
                onClick={() => toggleDrawer(contactId)}
                start={startDate}
                end={endDate}
                status={contacts[contactId].status}
                style={{cursor: "pointer"}}
              >
                {contacts[contactId].satellite}
              </RuxTimeRegion>
            </RuxTrack>
          );
        })}
        <RuxTrack slot="ruler">
          <RuxRuler />
        </RuxTrack>
      </RuxTimeline>
    </div>
  );
};

export default ConstellationTimeline;
