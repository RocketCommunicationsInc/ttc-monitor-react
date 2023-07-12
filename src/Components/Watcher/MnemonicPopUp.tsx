import { RuxCheckbox, RuxIcon, RuxPopUp, RuxCard } from "@astrouxds/react";
import type { Mnemonic } from "@astrouxds/mock-data";

type PropTypes = {
  triggerValue: string | number;
  data: Mnemonic;
};

const iconStyles = {
  marginLeft: "var(--spacing-1)",
  marginBottom: "var(--spacing-1)",
};

const linkStyles = {
  display: "flex",
  alignItems: "center",
};

const MnemonicPopUp = ({ triggerValue, data }: PropTypes) => {
  return (
    <RuxPopUp placement="right" className="mnemonic-pop-up">
      <RuxCard>
        <span slot="header">{data.mnemonicId}</span>
        <div>
          <span>Value</span>
          <span>{data.currentValue}</span>
        </div>
        <div>
          <span>Subsystem</span>
          <a
            href="https://ttc-investigate.astrouxds.com/?system=Attitude"
            target="_blank"
            rel="noreferrer"
            style={linkStyles}
          >
            Altitude
            <RuxIcon style={iconStyles} size="1rem" icon="launch" />
          </a>
        </div>
        <div slot="footer">
          <RuxCheckbox>Add to Watcher</RuxCheckbox>
        </div>
      </RuxCard>
      <span slot="trigger">{triggerValue}</span>
    </RuxPopUp>
  );
};

export default MnemonicPopUp;
