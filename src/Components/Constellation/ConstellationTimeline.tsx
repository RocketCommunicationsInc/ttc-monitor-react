import {
  RuxTimeline,
  RuxTrack,
  RuxTimeRegion,
  RuxRuler,
  RuxStatus,
} from "@astrouxds/react";
import { useTTCGRMContacts } from "@astrouxds/mock-data";

type PropTypes = {
  zoomLevel: number;
  toggleDrawer: (id?: string) => void;
};

const ConstellationTimeline = ({ zoomLevel, toggleDrawer }: PropTypes) => {
  const { dataById: contacts, dataIds: contactIds } = useTTCGRMContacts();

  const date = new Date();
  const getStartTime = date.setHours(date.getHours() - 23);
  const getEndTime = date.setDate(date.getDate() + 1);
  const getPlaybackTime = date.setHours(date.getHours() - 22);
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
        {contactIds.map((contactId: string) => (
          <RuxTrack key={contactId}>
            <div slot="label">
              <RuxStatus status={contacts[contactId].status} />
              {contacts[contactId].satellite.slice(4, 10)}
            </div>
            <RuxTimeRegion
              onClick={() => toggleDrawer(contactId)}
              start={new Date(contacts[contactId].beginTimestamp).toISOString()}
              end={new Date(contacts[contactId].endTimestamp).toISOString()}
              status={contacts[contactId].status}
            >
              {contacts[contactId].satellite}
            </RuxTimeRegion>
          </RuxTrack>
        ))}
        <RuxTrack slot="ruler">
          <RuxRuler />
        </RuxTrack>
      </RuxTimeline>
    </div>
  );
};

export default ConstellationTimeline;
