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
import type { Mnemonic, Status } from "@astrouxds/mock-data";
import { addToast } from "../../utils";

type PropTypes = {
  rowData: Mnemonic;
  chartDataSlope: number;
  index: number;
};

const WatcherListItem = ({ rowData, chartDataSlope, index }: PropTypes) => {
  return (
    <RuxTableRow key={rowData.mnemonicId} data-index={index}>
      <RuxTableCell>
        <RuxStatus status={rowData.status as Status} />
      </RuxTableCell>
      <RuxTableCell>
        <MnemonicPopUp triggerValue={rowData.mnemonicId} data={rowData} />
      </RuxTableCell>
      <RuxTableCell> {rowData.unit}</RuxTableCell>
      <RuxTableCell>
        <ThresholdInput savedValue={String(rowData.thresholdMax)} />
      </RuxTableCell>
      <RuxTableCell>
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
          <RuxMenu
            onRuxmenuselected={() =>
              addToast("This feature has not been implemented", false, 3000)
            }
          >
            <RuxMenuItem>Investigate</RuxMenuItem>
            <RuxMenuItem>Remove</RuxMenuItem>
          </RuxMenu>
        </RuxPopUp>
      </RuxTableCell>
    </RuxTableRow>
  );
};

export default WatcherListItem;
