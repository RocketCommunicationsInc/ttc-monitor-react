import { RuxCheckbox, RuxIcon, RuxPopUp } from "@astrouxds/react";

type PropTypes = {
  triggerValue: string | number;
};

const MnemonicPopUp = ({ triggerValue }: PropTypes) => {
  return (
    <RuxPopUp placement="right" className="mnemonic-pop-up">
      <div className="pop-up-menu-div">
        <div className="mnemonic-pop-up-title">PWBVTLM</div>
        <div className="mnemonic-pop-up-values">
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
        </div>
        <RuxCheckbox>Add to Watcher</RuxCheckbox>
      </div>
      <span slot="trigger" className="mneumonic-popup-value">
        {triggerValue}
      </span>
    </RuxPopUp>
  );
};

export default MnemonicPopUp;
