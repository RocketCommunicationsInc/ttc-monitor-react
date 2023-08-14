import {
  RuxStatus,
  RuxTableRow,
  RuxTableCell,
  RuxIcon,
  RuxPopUp,
  RuxMenu,
  RuxMenuItem,
  RuxTooltip,
} from "@astrouxds/react";
import ThresholdInput from "./ThresholdInput";
import type { Mnemonic, Status } from "@astrouxds/mock-data";
import { addToast } from "../../utils";

type PropTypes = {
  rowData: Mnemonic;
  chartDataSlope: number;
  index: number;
};

const WatcherListItem = ({ rowData, chartDataSlope, index }: PropTypes) => {
  const tooltipMessage = `${rowData.subsystem}/ ${rowData.measurement} - ${rowData.mnemonicId} `;

  return (
    <RuxTableRow key={rowData.mnemonicId} data-index={index}>
      <RuxTableCell>
        <RuxStatus status={rowData.status as Status} />
      </RuxTableCell>
      <RuxTableCell>
        <RuxTooltip message={tooltipMessage} placement="top-end" delay={300}>
          {rowData.mnemonicId}
        </RuxTooltip>
      </RuxTableCell>
      <RuxTableCell> {rowData.unit}</RuxTableCell>
      <RuxTableCell className="text-align-right">
        <ThresholdInput savedValue={String(rowData.thresholdMax)} />
      </RuxTableCell>
      <RuxTableCell className="text-align-right">
        <>
          {rowData.currentValue}
          {chartDataSlope >= 0 ? (
            <RuxIcon icon="arrow-upward" size="extra-small" />
          ) : (
            <RuxIcon icon="arrow-downward" size="extra-small" />
          )}
        </>
      </RuxTableCell>
      <RuxTableCell className="text-align-right">
        <RuxPopUp placement="left" closeOnSelect>
          <RuxIcon slot="trigger" icon="more-horiz" size="1.5rem" />
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
