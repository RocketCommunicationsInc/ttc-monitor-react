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

const styles = {
  slider: {
    display: "flex",
    alignSelf: "center",
    marginLeft: "auto",
  },
};

const Constellation = () => {
  const [content, setContent] = useState("List");
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleButton = (e: RuxSegmentedButtonCustomEvent<string>) => {
    setContent(e.detail);
  };

  const handleSliderChange = (e: RuxSliderCustomEvent<number>) => {
    setZoomLevel(e.target.value);
  };

  return (
    <RuxContainer className="constellation">
      <div slot="header" style={{ display: "flex" }}>
        Constellation
        {content === "Timeline" ? (
          <div style={styles.slider}>
            <RuxIcon icon="zoom-out" size="extra-small" />
            <RuxSlider
              value={zoomLevel}
              onRuxinput={handleSliderChange}
              min={0}
              max={10}
            ></RuxSlider>
            <RuxIcon icon="zoom-in" size="20px" />
          </div>
        ) : null}
        <RuxSegmentedButton
          style={content === "Timeline" ? { marginLeft: "1rem" } : { marginLeft: "auto" }}
          data={[{ label: "List" }, { label: "Timeline" }]}
          onRuxchange={handleButton}
        ></RuxSegmentedButton>
      </div>
      {content === "List" ? (
        <ConstellationList />
      ) : (
        <ConstellationTimeline zoomLevel={zoomLevel} />
      )}
    </RuxContainer>
  );
};

export default Constellation;
