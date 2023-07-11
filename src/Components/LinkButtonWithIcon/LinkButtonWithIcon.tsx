import { RuxButton, RuxIcon } from "@astrouxds/react";
import "./LinkButtonWithIcon.css";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLRuxButtonElement>) => void;
  text: string;
}

const LinkButtonWithIcon = ({ onClick, text }: ButtonProps) => {
  return (
    <>
      <RuxButton borderless onClick={onClick}>
        {text}
        <RuxIcon size="extra-small" icon="launch" />
      </RuxButton>
    </>
  );
};

export default LinkButtonWithIcon;
