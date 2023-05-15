import { useEffect } from "react";
import { RuxButton, RuxIcon, RuxStatus } from "@astrouxds/react";

import { Contact } from "../../Types";
import "./ContactDrawer.css";

const settings = {
  speedOpen: 50,
  speedClose: 350,
  activeClass: "is-active",
  visibleClass: "is-visible",
  selectorTarget: "[data-drawer-target]",
  selectorTrigger: "[data-drawer-trigger]",
  selectorClose: "[data-drawer-close]",
};

type PropTypes = {
  open: boolean;
  toggle: (id?: string) => void;
  contact: Contact | null;
};

// const styles = {
//   drawer: {
//     display: "none",
//   },
//   drawer_overlay: {},
// };

const ContactDrawer = ({ open, toggle, contact }: PropTypes) => {
  console.log("contact", contact);

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      toggle();
    }
  };

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
    // var closestParent = event.closest(settings.selectorTarget),
    //   childrenTrigger = document.querySelector(
    //     '[aria-controls="' + closestParent.id + '"'
    //   );
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
    } else {
      closeDrawer();
    }
  }, [open]);

  return (
    <section className="drawer" id="contact-drawer" data-drawer-target>
      <div className="drawer__overlay" data-drawer-close tabIndex={-1}></div>
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
              //   className="drawer__close"
              borderless
              size="small"
              data-drawer-close
              aria-label="Close Drawer"
              onClick={closeDrawer}
              icon="keyboard-arrow-right"
            >
              Close
              {/* <RuxIcon icon="keyboard-arrow-left" size="extra-small" />
              <RuxIcon icon="keyboard-arrow-left" size="extra-small" /> */}
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
