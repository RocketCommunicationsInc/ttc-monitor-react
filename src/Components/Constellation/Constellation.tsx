import { useState, useCallback } from "react";
import {
  RuxContainer,
  RuxSegmentedButton,
  RuxSlider,
  RuxIcon,
} from "@astrouxds/react";
import ConstellationList from "./ConstellationList";
import ConstellationTimeline from "./ConstellationTimeline";
import ContactDrawer from "../ContactDrawer/ContactDrawer";
import {
  RuxSegmentedButtonCustomEvent,
  RuxSliderCustomEvent,
} from "@astrouxds/astro-web-components/dist/types/components";
import type { Contact } from "@astrouxds/mock-data";
import { useTTCGRMContacts } from "@astrouxds/mock-data";
import "./Constellation.css";

const Constellation = () => {
  const [content, setContent] = useState("List");
  const [zoomLevel, setZoomLevel] = useState(5);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContact, setDrawerContact] = useState<Contact | null>(null);
  const [selectPassPlan, setSelectPassPlan] = useState<boolean>(false);

  const { dataById: contacts, dataIds: contactIds } = useTTCGRMContacts();

  const handleButton = (e: RuxSegmentedButtonCustomEvent<string>) => {
    setContent(e.detail);
  };

  const handleSliderChange = (e: RuxSliderCustomEvent<number>) => {
    setZoomLevel(e.target.value);
  };

  const toggleDrawer = useCallback(
    (id?: string, passPlan?: boolean) => {
      if (id) setDrawerContact(contacts[id]);
      setDrawerOpen((prevState) => !prevState);

      passPlan ? setSelectPassPlan(true) : setSelectPassPlan(false);
    },
    [contacts]
  );

  return (
    <>
      <RuxContainer className="constellation">
        <div slot="header" className="header">
          Constellation
          {content === "Timeline" ? (
            <div className="slider">
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
            style={
              content === "Timeline"
                ? { marginLeft: "1rem" }
                : { marginLeft: "auto" }
            }
            data={[{ label: "List" }, { label: "Timeline" }]}
            onRuxchange={handleButton}
          ></RuxSegmentedButton>
        </div>
        {content === "List" && contactIds?.length ? (
          <ConstellationList
            contacts={contacts}
            contactIds={contactIds}
            toggleDrawer={toggleDrawer}
          />
        ) : (
          <ConstellationTimeline
            toggleDrawer={toggleDrawer}
            zoomLevel={zoomLevel}
          />
        )}
      </RuxContainer>
      <ContactDrawer
        open={drawerOpen}
        selectPassPlan={selectPassPlan}
        toggle={toggleDrawer}
        contact={drawerContact}
      />
    </>
  );
};

export default Constellation;
