import {
  RuxTimeline,
  RuxTrack,
  RuxTimeRegion,
  RuxRuler,
} from "@astrouxds/react";
import useContacts from "../../hooks/useContacts";

type PropTypes = {
  zoomLevel: number;
};

const ConstellationTimeline = ({ zoomLevel }: PropTypes) => {
  const { contacts, contactIds } = useContacts();

  return (
    <div className="timeline-wrapper">
      <RuxTimeline
        timezone="UTC"
        start="2023-05-23T11:00:00.000Z"
        end="2023-05-24T11:00:00.005Z"
        playhead="2023-05-23T14:00:00.000Z"
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
              <div slot="label">
                {contacts[contactId].satellite.slice(4, 10)}
              </div>
              <RuxTimeRegion
                start={startDate}
                end={endDate}
                status={contacts[contactId].status}
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
