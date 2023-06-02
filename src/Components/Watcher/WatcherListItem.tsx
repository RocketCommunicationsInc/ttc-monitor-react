import type { Status } from "../../Types";
import { Mnemonic } from "@astrouxds/mock-data/dist/types";
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
  chartDataSlope: number;
  index: number;
  setOpenBanner: React.Dispatch<React.SetStateAction<boolean>>;
};

const WatcherListItem = ({
  rowData,
  chartDataSlope,
  index,
  setOpenBanner,
}: PropTypes) => {
  return (
    <RuxTableRow key={rowData.mnemonicId} data-index={index}>
      <RuxTableCell>
        {" "}
        <RuxStatus status={rowData.status as Status} />
      </RuxTableCell>
      <RuxTableCell>
        {" "}
        <MnemonicPopUp triggerValue={rowData.mnemonicId} data={rowData} />
      </RuxTableCell>
      <RuxTableCell> {rowData.unit}</RuxTableCell>
      <RuxTableCell>
        {" "}
        <ThresholdInput savedValue={String(rowData.thresholdMax)} />
      </RuxTableCell>
      <RuxTableCell>
        {" "}
        <>
          {rowData.currentValue}
          {chartDataSlope >= 0 ? (
            <RuxIcon icon="arrow-upward" size="extra-small" />
          ) : (
            <RuxIcon icon="arrow-downward" size="extra-small" />
          )}
        </>
      </RuxTableCell>
      <RuxTableCell>
        <RuxPopUp placement="left" closeOnSelect>
          <RuxIcon slot="trigger" icon="more-horiz" size="small" />
          <RuxMenu onRuxmenuselected={() => setOpenBanner(true)}>
            <RuxMenuItem>Investigate</RuxMenuItem>
            <RuxMenuItem>Remove</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
      </RuxTableCell>
    </RuxTableRow>
  );
};

export default WatcherListItem;
