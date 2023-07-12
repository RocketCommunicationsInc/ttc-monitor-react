import { RuxButton, RuxIcon } from "@astrouxds/react";
import "./LinkButtonWithIcon.css";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLRuxButtonElement>) => void;
  text: string;
}

const LinkButtonWithIcon = ({ onClick, text }: ButtonProps) => {
  return (
    <>
      <RuxButton className="link-button-with-icon" borderless onClick={onClick}>
        {text}
        <RuxIcon className="launch-icon" size="extra-small" icon="launch" />
      </RuxButton>
    </>
  );
};

export default LinkButtonWithIcon;
