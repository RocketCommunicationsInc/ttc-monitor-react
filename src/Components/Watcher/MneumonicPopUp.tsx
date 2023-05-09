import { RuxCheckbox, RuxIcon, RuxMenu, RuxPopUp } from "@astrouxds/react";

const styles = {
  popUpMenuDiv: {
    paddingRight: "3rem",
    paddingLeft: "1rem",
    marginBlock: ".5rem",
  },
  volts: {
    marginLeft: "4rem",
    fontWeight: "var(--font-weights-bold)",
  },
  altitudeLink: {
    marginLeft: "1.5rem",
  },
  boldPopUpWords: {
    fontWeight: "var(--font-weights-bold)",
  },
  popUpValue: {
    color: "var(--color-palette-brightblue-300)",
  },
};

type PropTypes = {
  triggerValue: string | number;
};

const MneumonicPopUp = ({ triggerValue }: PropTypes) => {
  return (
    <RuxPopUp placement="right">
      <RuxMenu>
        <div style={styles.popUpMenuDiv}>
          <span style={styles.boldPopUpWords}>PWBVTLM</span>
          <div style={{ marginTop: ".75rem" }}>
            Value
            <span style={styles.volts}>24.2 Volts</span>
          </div>
          <div style={{ marginBottom: ".75rem" }}>
            Subsystem
            <span style={styles.altitudeLink}>
              <a
                href="https://ttc-investigate.astrouxds.com/?system=Attitude"
                target="_blank"
                rel="noreferrer"
              >
                Altitude
              </a>
              <RuxIcon size="1rem" icon="launch" />
            </span>
          </div>
          <RuxCheckbox>
            <span style={styles.boldPopUpWords}>Add to Watcher</span>
          </RuxCheckbox>
        </div>
      </RuxMenu>
      <span
        slot="trigger"
        style={styles.popUpValue}
        className="mneumonic-popup-value"
      >
        {triggerValue}
      </span>
    </RuxPopUp>
  );
};

export default MneumonicPopUp;
