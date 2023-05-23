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

  // const regions = [
  //   "ALPH 6648",
  //   "ECHO 1100",
  //   "FOXI 3232",
  //   "GOLF 5602",
  //   "HOTL 0002",
  //   "IRON 4090",
  //   "JULI 3309",
  //   "KILO 4684",
  //   "LIMA 2017",
  //   "MIKE 7509",
  // ];

  return (
    <RuxTimeline
      timezone="America/New_York"
      start="2023-05-23T00:09:00.000Z"
      end="2023-05-24T18:00:09.695Z"
      playhead="2023-05-23T04:00:00.000Z"
      interval="hour"
      zoom={zoomLevel}
    >
      {contactIds.map((contactId) => {
        const beginDate = new Date(contacts[contactId].beginTimestamp).toISOString()
          const endDate = new Date(contacts[contactId].endTimestamp).toISOString()
        console.log(beginDate)
        return (
               <RuxTrack>
          <div slot="label">{contacts[contactId].equipment.slice(0, 6)}</div>
          <RuxTimeRegion
            start={beginDate}
            end={endDate}
            status={contacts[contactId].status}
          >
            {contacts[contactId].satellite}
          </RuxTimeRegion>
        </RuxTrack>
        )
      }
      )}
      <RuxTrack slot="ruler">
        <RuxRuler />
      </RuxTrack>
    </RuxTimeline>
  );
};

export default ConstellationTimeline;
