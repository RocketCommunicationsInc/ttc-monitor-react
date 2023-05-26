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
  options?: ContactOptions;
};

const ConstellationTimeline = ({
  zoomLevel,
  toggleDrawer,
  options,
}: PropTypes) => {
  const { contacts, contactIds } = useContacts();

  const date = new Date();
  const getStartTime = date.setHours(date.getHours() - 2);
  const getEndTime = date.setDate(date.getDate() + 1);
  const getPlaybackTime = date.setHours(date.getHours() - 22)
  const startTime = new Date(getStartTime).toISOString();
  const endTime = new Date(getEndTime).toISOString();
  const playhead = new Date(getPlaybackTime).toISOString();

  return (
    <div className="timeline-wrapper">
      <RuxTimeline
        timezone="UTC"
        start={startTime}
        end={endTime}
        playhead={playhead}
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
                <RuxStatus status={contacts[contactId].status} />
                {contacts[contactId].satellite.slice(4, 10)}
              </div>
              <RuxTimeRegion
                onClick={() => toggleDrawer(contactId)}
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
