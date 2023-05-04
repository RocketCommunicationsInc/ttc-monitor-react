import {
  RuxTimeline,
  RuxTrack,
  RuxTimeRegion,
  RuxRuler,
} from "@astrouxds/react";

const ConstellationTimeline = () => {
  return (
    <RuxTimeline
      timezone="America/New_York"
      start="2021-02-01T00:00:00.000Z"
      end="2021-02-03T00:00:00.000Z"
      playhead="2021-02-01T04:00:00.000Z"
      interval="hour"
      zoom={2}
    >
      <RuxTrack slot="ruler">
        <RuxRuler />
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 1</div>
        <RuxTimeRegion
          start="2021-02-01T01:00:00Z"
          end="2021-02-01T02:00:00Z"
          status="serious"
        >
          Event 1.2
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 2</div>
        <RuxTimeRegion
          start="2021-02-01T10:00:00Z"
          end="2021-02-01T12:00:00Z"
          status="serious"
        >
          Event 2.1
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 3</div>
        <RuxTimeRegion
          start="2021-02-01T00:00:00Z"
          end="2021-02-02T02:00:00Z"
          status="standby"
        >
          Event 3.1
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 4</div>
        <RuxTimeRegion
          start="2021-02-01T03:00:00Z"
          end="2021-02-02T04:33:00Z"
          status="critical"
        >
          Event 4.1
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 5</div>
        <RuxTimeRegion
          start="2021-02-01T05:00:00Z"
          end="2021-02-02T05:33:00Z"
          status="caution"
        >
          Event 5.1
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 6</div>
        <RuxTimeRegion
          start="2021-02-01T05:00:00Z"
          end="2021-02-02T05:33:00Z"
          status="normal"
        >
          Event 6.1
        </RuxTimeRegion>
      </RuxTrack>
      <RuxTrack>
        <div slot="label">Region 7</div>
        <RuxTimeRegion
          start="2021-02-01T05:00:00Z"
          end="2021-02-02T05:33:00Z"
          status="normal"
        >
          Event 7.1
        </RuxTimeRegion>
      </RuxTrack>
    </RuxTimeline>
  );
};

export default ConstellationTimeline;
