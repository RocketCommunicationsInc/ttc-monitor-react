import type { rowDataObject, rowDataValue, Status } from "../../Types";
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
  rowData: rowDataObject;
};

const WatcherListItem = ({ rowData }: PropTypes) => {
  const popupMenuHandler = () => {
    alert("This feature has not been implemented.");
  };

  const getCellContent = (key: keyof rowDataObject, value: rowDataValue) => {
    switch (key) {
      case "status":
        return <RuxStatus status={rowData.status as Status} />;
      case "mnemonic":
        return <MnemonicPopUp triggerValue={value} />;
      case "threshold":
        return <ThresholdInput savedValue={String(value)} />;
      default:
        return value;
    }
  };

  return (
    <RuxTableRow key={rowData.key}>
      {Object.entries(rowData).map(([key, value]) => (
        <RuxTableCell> {getCellContent(key, value)}</RuxTableCell>
      ))}
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
