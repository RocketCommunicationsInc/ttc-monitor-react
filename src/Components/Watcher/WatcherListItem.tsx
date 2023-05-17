import type { rowDataObject, Status } from "../../Types";
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

type PropTypes = {
  rowData: rowDataObject;
};

const WatcherListItem = ({ rowData }: PropTypes) => {
  const popupMenuHandler = () => {
    alert("This feature has not been implemented.");
  };

  return (
    <RuxTableRow key={rowData.key}>
      {Object.entries(rowData).map(([key, value]) =>
        key === "status" ? (
          <RuxTableCell>
            <RuxStatus status={rowData.status as Status} />
          </RuxTableCell>
        ) : key === "mnemonic" ? (
          <RuxTableCell>
            <MnemonicPopUp triggerValue={value} />
          </RuxTableCell>
        ) : (
          <RuxTableCell style={{ textAlign: "right" }}>{value}</RuxTableCell>
        )
      )}
      <RuxTableCell>
        <RuxPopUp placement="left">
          <RuxIcon slot="trigger" icon="more-horiz" size="small" />
          <RuxMenu>
            <RuxMenuItem onClick={popupMenuHandler}>Investigate</RuxMenuItem>
            <RuxMenuItem onClick={popupMenuHandler}>Remove</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
      </RuxTableCell>
    </RuxTableRow>
  );
};

export default WatcherListItem;
