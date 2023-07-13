import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  RuxButton,
  RuxStatus,
  RuxTabs,
  RuxTab,
  RuxTabPanels,
  RuxTabPanel,
  RuxContainer,
} from "@astrouxds/react";
import ContactDetails from "./ContactDetails/ContactDetails";
import PassPlan from "./PassPlan/PassPlan";
import passPlanData from "./PassPlan/passPlanData.json";
import type { Contact } from "@astrouxds/mock-data";
import "./ContactDrawer.css";
import LinkButtonWithIcon from "../LinkButtonWithIcon/LinkButtonWithIcon";
import { addToast } from "../../utils";

const settings = {
  speedOpen: 50,
  speedClose: 350,
  activeClass: "is-active",
  visibleClass: "is-visible",
};

type PropTypes = {
  open: boolean;
  toggle: (id?: string) => void;
  contact: Contact | null;
};

const ContactDrawer = ({ open, toggle, contact }: PropTypes) => {
  const [selectedTab, setSelectedTab] = useState("");
  const passPlanRef = useRef<HTMLRuxTabElement | null>(null);
  const contactDrawer = useRef<HTMLElement | null>(null);
  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggle();
      }
    },
    [toggle]
  );

  //   Will only go up to 24 hours
  const passPlanLength = useMemo(() => {
    const total = passPlanData.reduce((acc, currentValue) => {
      if (currentValue.runLength) {
        const { runLength } = currentValue;
        const hours = Number(runLength.slice(0, 2));
        const minutes = Number(runLength.slice(3, 5));
        const seconds = Number(runLength.slice(6));

        return (acc += seconds * 1000 + minutes * 60000 + hours * 360000);
      } else return acc;
    }, 0);
    return new Date(total).toUTCString().slice(-12, -4);
  }, []);

  const openDrawer = () => {
    if (contactDrawer.current) {
      // Make it active
      contactDrawer.current.classList.add(settings.activeClass);

      // Make body overflow hidden so it's not scrollable
      document.documentElement.style.overflow = "hidden";

      // Make it visible
      setTimeout(() => {
        contactDrawer.current?.classList.add(settings.visibleClass);
        // trapFocus(target);
      }, settings.speedOpen);
    }
  };

  const closeDrawer = () => {
    if (contactDrawer.current) {
      // Make it not visible
      contactDrawer.current.classList.remove(settings.visibleClass);

      // Remove body overflow hidden
      document.documentElement.style.overflow = "";

      // Make it not active
      setTimeout(function () {
        contactDrawer.current?.classList.remove(settings.activeClass);
      }, settings.speedClose);
    }
  };

  useEffect(() => {
    if (open) {
      openDrawer();
      document.addEventListener("keydown", keydownHandler);
    } else {
      closeDrawer();
    }

    return () => document.removeEventListener("keydown", keydownHandler);
  }, [open, keydownHandler]);

  return (
    <section className={"drawer"} id="contact-drawer" ref={contactDrawer}>
      <div
        className="drawer__overlay"
        tabIndex={-1}
        onClick={() => toggle()}
      ></div>
      {contact ? (
        <RuxContainer className="drawer__wrapper">
          <div className="drawer__header">
            <div>
              <RuxStatus status={contact.status} />
              <LinkButtonWithIcon
                onClick={() =>
                  addToast("This feature has not been implemented", false, 3000)
                }
                text={contact.satellite}
              />
            </div>
            <RuxButton
              borderless
              size="small"
              aria-label="Close Drawer"
              onClick={() => toggle()}
              icon="keyboard-arrow-right"
            >
              Close
            </RuxButton>
          </div>
          <div className="drawer__content">
            <div className="tabs-wrapper">
              <RuxTabs
                onRuxselected={(e) => setSelectedTab(e.detail.id)}
                small
                id="contact-drawer-tabs"
              >
                <RuxTab id="contact-details-tab">Contact Details</RuxTab>
                <RuxTab ref={passPlanRef} id="pass-plan-tab">
                  Pass Plan
                </RuxTab>
              </RuxTabs>
            </div>

            <RuxTabPanels aria-labelledby="contact-drawer-tabs">
              <RuxTabPanel aria-labelledby="contact-details-tab">
                <ContactDetails contact={contact} />
              </RuxTabPanel>
              <RuxTabPanel aria-labelledby="pass-plan-tab">
                <PassPlan contact={contact} passPlan={passPlanData} />
              </RuxTabPanel>
            </RuxTabPanels>
          </div>
          {selectedTab === "pass-plan-tab" ? (
            <footer className="run-length-footer">
              {`Total Run Length: ${passPlanLength}`}
            </footer>
          ) : null}
        </RuxContainer>
      ) : null}
    </section>
  );
};

export default ContactDrawer;
