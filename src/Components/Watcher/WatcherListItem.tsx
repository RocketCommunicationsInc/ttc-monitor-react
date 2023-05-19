import type { Mnemonic, Status } from "../../Types";
import {
  RuxStatus,
  RuxTableRow,
  RuxTableCell,
  RuxIcon,
  RuxPopUp,
  RuxMenu,
  RuxMenuItem,
} from "@astrouxds/react";
import MnemonicPopUp from "./MnemonicPopUp";
import ThresholdInput from "./ThresholdInput";

type PropTypes = {
  rowData: Mnemonic;
  index: number;
};

const WatcherListItem = ({ rowData, index }: PropTypes) => {
  const popupMenuHandler = () => {
    alert("This feature has not been implemented.");
  };

  const getCellContent = (key: string, value: any) => {
    switch (key) {
      case "status":
        return <RuxStatus status={rowData.status as Status} />;
      case "mnemonic":
        return <MnemonicPopUp triggerValue={value} />;
      case "threshold":
        return <ThresholdInput savedValue={String(value)} />;
      case "value":
        return (
          <>
            {value}
            {rowData.trendingUp ? (
              <RuxIcon icon="arrow-upward" size="extra-small" />
            ) : (
              <RuxIcon icon="arrow-downward" size="extra-small" />
            )}
          </>
        );
      default:
        return value;
    }
  };

  return (
    <RuxTableRow key={rowData.mnemonic} data-index={index}>
      {Object.entries(rowData).map(([key, value]) => {
        return (
          key !== "chartData" &&
          key !== "trendingUp" && (
            <RuxTableCell> {getCellContent(key, value)}</RuxTableCell>
          )
        );
      })}
      <RuxTableCell>
        <RuxPopUp placement="left">
          <RuxIcon slot="trigger" icon="more-horiz" size="small" />
          <RuxMenu onRuxmenuselected={popupMenuHandler}>
            <RuxMenuItem>Investigate</RuxMenuItem>
            <RuxMenuItem>Remove</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
      </RuxTableCell>
    </RuxTableRow>
  );
};

export default WatcherListItem;
