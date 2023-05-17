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
  RuxTree,
  RuxTreeNode,
} from "@astrouxds/react";
import type { rowDataObject, Status } from "../../Types";
import LineChart from "./LineChart";
import WatcherListItem from "./WatcherListItem";

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

const fixtureData = Array(10).fill(watcherDataItem);

const Watcher = () => {
  return (
    <div className="watcher">
      <RuxContainer>
        <div slot="header" style={styles.container}>
          Watcher
        </div>
        {/* <div slot="toolbar" style={styles.container}>

        </div> */}
        <RuxTree>
          <RuxTreeNode>
            IRON 4090
            <RuxTreeNode slot="node">
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
                    <WatcherListItem rowData={dataObj} />
                  ))}
                </RuxTableBody>
              </RuxTable>
            </RuxTreeNode>
          </RuxTreeNode>
        </RuxTree>
      </RuxContainer>
      <div className="canvas-wrapper">
        <LineChart subtitle={watcherDataItem.mnemonic} />
      </div>
    </div>
  );
};

export default Watcher;
