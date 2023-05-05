import { useState } from "react";
import {
  RuxContainer,
  RuxSegmentedButton,
  RuxSlider,
  RuxIcon,
} from "@astrouxds/react";
import ConstellationList from "./ConstellationList";
import ConstellationTimeline from "./ConstellationTimeline";
import {
  RuxSegmentedButtonCustomEvent,
  RuxSliderCustomEvent,
} from "@astrouxds/astro-web-components/dist/types/components";

const Constellation = () => {
  const [content, setContent] = useState(<ConstellationList />);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleButton = (e: RuxSegmentedButtonCustomEvent<string>) => {
    console.log(e.detail);
    if (e.detail === "List") {
      setShowZoomSlider(false);
      setContent(<ConstellationList />);
    } else {
      setShowZoomSlider(true);
      setContent(<ConstellationTimeline zoomLevel={zoomLevel} />);
    }
  };

  const handleSliderChange = (e: RuxSliderCustomEvent<number>) => {
    console.log(e);
    setZoomLevel(e.target.value);
  };

  return (
    <RuxContainer className="constellation">
      <div slot="header" style={{ display: "flex" }}>
        Constellation
        {showZoomSlider ? (
          <RuxSlider
            value={zoomLevel}
            onRuxchange={handleSliderChange}
            min={1}
            max={10}
          >
            <RuxIcon slot="label" icon="zoom" />
          </RuxSlider>
        ) : null}
        <RuxSegmentedButton
          style={{ marginLeft: "auto" }}
          data={[{ label: "List" }, { label: "Timeline" }]}
          onRuxchange={handleButton}
        ></RuxSegmentedButton>
      </div>
      {content}
    </RuxContainer>
  );
};

export default Constellation;
