import { RuxCheckbox, RuxIcon, RuxPopUp, RuxCard } from "@astrouxds/react";

type PropTypes = {
  triggerValue: string | number;
};

const MnemonicPopUp = ({ triggerValue }: PropTypes) => {
  return (
    <RuxPopUp placement="right" className="mnemonic-pop-up">
      <RuxCard>
        <span slot="header">PWBVTLM</span>
        <div>
          <span>Value</span>
          <span>24.2 Volts</span>
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
