import { RuxCheckbox, RuxIcon, RuxMenu, RuxPopUp } from "@astrouxds/react";
import "./MnemonicPopUp.css";

type PropTypes = {
  triggerValue: string | number;
};

const MnemonicPopUp = ({ triggerValue }: PropTypes) => {
  return (
    <RuxPopUp placement="right">
      <RuxMenu>
        <div className="pop-up-menu-div">
          <span className="bold-values">PWBVTLM</span>
          <div id="value">
            Value
            <span id="volts">24.2 Volts</span>
          </div>
          <div id="subsystem">
            Subsystem
            <span id="altitude-link">
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
            <span className="bold-values">Add to Watcher</span>
          </RuxCheckbox>
        </div>
      </RuxMenu>
      <span slot="trigger" className="mneumonic-popup-value">
        {triggerValue}
      </span>
    </RuxPopUp>
  );
};

export default MnemonicPopUp;
