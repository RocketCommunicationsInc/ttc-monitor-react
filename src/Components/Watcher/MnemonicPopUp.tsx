import { RuxCheckbox, RuxIcon, RuxPopUp, RuxCard } from "@astrouxds/react";
import type { Mnemonic } from "@astrouxds/mock-data/dist/types";

type PropTypes = {
  triggerValue: string | number;
  data: Mnemonic;
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
          <span>
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
        <div slot="footer">
          <RuxCheckbox>Add to Watcher</RuxCheckbox>
        </div>
      </RuxCard>
      <span slot="trigger">{triggerValue}</span>
    </RuxPopUp>
  );
};

export default MnemonicPopUp;
