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
  setOpenBanner: React.Dispatch<React.SetStateAction<boolean>>;
};

const WatcherListItem = ({ rowData, index, setOpenBanner }: PropTypes) => {
  const getCellContent = (key: string, value: any) => {
    switch (key) {
      case "status":
        return <RuxStatus status={rowData.status as Status} />;
      case "mnemonic":
        return <MnemonicPopUp triggerValue={value} data={rowData} />;
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
