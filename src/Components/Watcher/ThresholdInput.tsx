import { useState, useRef } from "react";
import { RuxInput, RuxIcon, RuxButton } from "@astrouxds/react";

type PropTypes = {
  savedValue: string;
};

const ThresholdInput = ({ savedValue }: PropTypes) => {
  const [showInput, setShowInput] = useState(false);
  const [currentValue, setCurrentValue] = useState(savedValue);

  const inputEl = useRef<any>();

  const handleAcceptClick = () => {
    setCurrentValue(inputEl.current.value);
    setShowInput(false);
  };

  const handleCancelClick = () => {
    setCurrentValue(savedValue);
    setShowInput(false);
  };

  const handleInputChange = () => {
    setCurrentValue(inputEl.current.value);
  };

  return (
    <>
      {showInput ? (
        <RuxInput
          onRuxinput={handleInputChange}
          type="number"
          size="small"
          value={currentValue}
          ref={inputEl}
        >
          <div slot="suffix">
            <div onClickCapture={() => handleAcceptClick()}>
              <RuxIcon icon="check" size="extra-small"></RuxIcon>
            </div>
            <div onClickCapture={() => handleCancelClick()}>
              <RuxIcon icon="close" size="extra-small"></RuxIcon>
            </div>
          </div>
        </RuxInput>
      ) : (
        <RuxButton
          size="small"
          className="threshold-value"
          secondary
          borderless
          onClick={(e) => {
            setShowInput(true);
          }}
        >
          {currentValue}
        </RuxButton>
      )}
    </>
  );
};

export default ThresholdInput;
