import { useState, useRef } from "react";
import { RuxInput, RuxIcon } from "@astrouxds/react";

type PropTypes = {
  savedValue: string;
};

const ThresholdInput = ({ savedValue }: PropTypes) => {
  const [showInput, setShowInput] = useState(false);
  const [currentValue, setCurrentValue] = useState(savedValue);

  const inputEl = useRef<any>();

  const onAcceptClick = () => {
    setCurrentValue(inputEl.current.value);
    setShowInput(false);
  };

  const onCancelClick = () => {
    setCurrentValue(savedValue);
    setShowInput(false);
  };

  return (
    <>
      {showInput ? (
        <RuxInput type="number" size="small" value={currentValue} ref={inputEl}>
          <div slot="suffix">
            <div onClickCapture={() => onAcceptClick()}>
              <RuxIcon icon="check" size="extra-small"></RuxIcon>
            </div>
            <div onClickCapture={() => onCancelClick()}>
              <RuxIcon icon="close" size="extra-small"></RuxIcon>
            </div>
          </div>
        </RuxInput>
      ) : (
          <div style={{width: "fit-content", marginLeft: "auto"}}
          onClickCapture={(e) => {
            setShowInput(true);
          }}
        >
          {currentValue}
        </div>
      )}
    </>
  );
};

export default ThresholdInput;
