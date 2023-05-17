import type { rowDataObject, Status } from "../../Types";
import { RuxStatus, RuxTableRow, RuxTableCell } from "@astrouxds/react";
import MnemonicPopUp from "./MnemonicPopUp";

type PropTypes = {
  rowData: rowDataObject;
};

const WatcherListItem = ({ rowData }: PropTypes) => {
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
    </RuxTableRow>
  );
};

export default WatcherListItem;
