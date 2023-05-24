import {
  RuxContainer,
  RuxStatus,
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
} from "@astrouxds/react";
import type { rowDataObject, Status } from "../../Types";
import LineChart from "./LineChart";
import MnemonicPopUp from "./MnemonicPopUp";

const styles = {
  container: {
    display: "flex",
  },
};

const watcherDataItem = {
  status: "caution" as const,
  mnemonic: "PWST2IA",
  unit: "Volts",
  threshold: 45.6,
  actual: 32.2,
};

const fixtureData = Array(20).fill(watcherDataItem);

const Watcher = () => {
  return (
    <div className="watcher">
      <RuxContainer>
        <div slot="header" style={styles.container}>
          Watcher
        </div>
        <div slot="toolbar" style={styles.container}>
          IRON 4090
        </div>
        <div className="table-wrapper">
          <RuxTable>
            <RuxTableHeader>
              <RuxTableHeaderRow>
                <RuxTableHeaderCell>
                  {/* placeholder for status icon column */}
                </RuxTableHeaderCell>
                <RuxTableHeaderCell>Mnemonic</RuxTableHeaderCell>
                <RuxTableHeaderCell>Unit</RuxTableHeaderCell>
                <RuxTableHeaderCell>Threshold</RuxTableHeaderCell>
                <RuxTableHeaderCell>Actual</RuxTableHeaderCell>
              </RuxTableHeaderRow>
            </RuxTableHeader>
            <RuxTableBody>
              {fixtureData.map((dataObj: rowDataObject) => (
                <RuxTableRow key={dataObj.key}>
                  {Object.entries(dataObj).map(([key, value]) =>
                    key === "status" ? (
                      <RuxTableCell>
                        <RuxStatus status={dataObj.status as Status} />
                      </RuxTableCell>
                    ) : key === "mnemonic" ? (
                      <RuxTableCell>
                        <MnemonicPopUp triggerValue={value} />
                      </RuxTableCell>
                    ) : (
                      <RuxTableCell style={{ textAlign: "right" }}>
                        {value}
                      </RuxTableCell>
                    )
                  )}
                </RuxTableRow>
              ))}
            </RuxTableBody>
          </RuxTable>
        </div>
      </RuxContainer>
      <div className="canvas-wrapper">
        <LineChart subtitle={watcherDataItem.mnemonic} />
      </div>
    </div>
  );
};

export default Watcher;
