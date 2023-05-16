import { useCallback, useEffect } from "react";
import { RuxButton, RuxStatus } from "@astrouxds/react";

import { Contact } from "../../Types";
import "./ContactDrawer.css";

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
  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggle();
      }
    },
    [toggle]
  );

  const openDrawer = () => {
    // Find target
    var target = document.getElementById("contact-drawer");

    if (target) {
      // Make it active
      target.classList.add(settings.activeClass);

      // Make body overflow hidden so it's not scrollable
      document.documentElement.style.overflow = "hidden";

      // Toggle accessibility
      // toggleAccessibility(trigger);

      // Make it visible
      setTimeout(() => {
        target?.classList.add(settings.visibleClass);
        // trapFocus(target);
      }, settings.speedOpen);
    }
  };

  const closeDrawer = () => {
    // Find target
    var target = document.getElementById("contact-drawer");

    if (target) {
      // Make it not visible
      target.classList.remove(settings.visibleClass);

      // Remove body overflow hidden
      document.documentElement.style.overflow = "";

      // Toggle accessibility
      // toggleAccessibility(childrenTrigger);

      // Make it not active
      setTimeout(function () {
        target?.classList.remove(settings.activeClass);
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
    <section className={"drawer"} id="contact-drawer">
      <div className="drawer__overlay" tabIndex={-1}></div>
      {contact ? (
        <div className="drawer__wrapper">
          <div className="drawer__header">
            <div className="drawer__title">
              <RuxStatus
                status={contact.status}
                className="drawer-title-status"
              />
              {contact.satellite}
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem in
              aliquid nulla, sed veritatis, officiis ea aut natus quas
              voluptates perferendis ratione modi ab qui omnis cum labore alias
              eos.
            </p>
            <div style={{ padding: "50px 0" }}></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aut
              exercitationem laborum vero tenetur officiis facilis eveniet sunt
              quo voluptatibus sit reiciendis, iusto quia et quidem? Dolores
              dolor et necessitatibus.
            </p>
            <div style={{ padding: "50px 0" }}></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aut
              exercitationem laborum vero tenetur officiis facilis eveniet sunt
              quo voluptatibus sit reiciendis, iusto quia et quidem? Dolores
              dolor et necessitatibus.
            </p>
            <div style={{ padding: "50px 0" }}></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aut
              exercitationem laborum vero tenetur officiis facilis eveniet sunt
              quo voluptatibus sit reiciendis, iusto quia et quidem? Dolores
              dolor et necessitatibus.
            </p>
            <div style={{ padding: "50px 0" }}></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aut
              exercitationem laborum vero tenetur officiis facilis eveniet sunt
              quo voluptatibus sit reiciendis, iusto quia et quidem? Dolores
              dolor et necessitatibus.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ContactDrawer;
