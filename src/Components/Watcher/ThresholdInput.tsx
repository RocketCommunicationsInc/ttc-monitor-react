import { MouseEventHandler, useState } from "react";
import { RuxTableCell, RuxInput, RuxIcon } from "@astrouxds/react";

type PropTypes = {
  savedValue: string;
};

const ThresholdInput = ({ savedValue }: PropTypes) => {
  const [showInput, setShowInput] = useState(false);
  const [currentValue, setCurrentValue] = useState(savedValue);

  const onAcceptClick = () => {
    console.log("blah");
    setShowInput(false);
  };

  const onCancelClick = () => {
    setShowInput(false);
  };

  return (
    <>
      {showInput ? (
        <RuxInput type="number" size="small" value={currentValue}>
          <div slot="suffix" style={{ display: "flex"}}>
            <div onClickCapture={() => onAcceptClick()}>
              <RuxIcon icon="check" size="extra-small"></RuxIcon>
            </div>
            <div onClickCapture={() => onAcceptClick()}>
              <RuxIcon icon="close" size="extra-small"></RuxIcon>
            </div>
          </div>
        </RuxInput>
      ) : (
        <div
          onClickCapture={(e) => {
            setShowInput(true);
          }}
        >
          {savedValue}
        </div>
      )}
    </>
  );
};

export default ThresholdInput;
