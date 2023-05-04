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
import type { rowDataObject } from "../Types/types";
import LineChart from "./LineChart";
import MneumonicPopUp from "./MneumonicPopUp";

const styles = {
  container: {
    display: "flex",
  },
};

const watcherDataItem = {
  status: "caution" as const,
  Mneumonic: 19999999,
  Unit: "000011111",
  Threshold: 450,
  Actual: "Full",
};

const fixtureData = Array(10).fill(watcherDataItem);

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
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              {Object.keys(fixtureData[0]).map((key) => (
                <RuxTableHeaderCell>
                  {key === "status" ? "" : key}
                </RuxTableHeaderCell>
              ))}
            </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {fixtureData.map((dataObj: rowDataObject) => (
              <RuxTableRow>
                {Object.entries(dataObj).map(([key, value]) =>
                  key === "status" ? (
                    <RuxTableCell>
                      <RuxStatus status={dataObj.status} />
                    </RuxTableCell>
                  ) : key === "Mneumonic" ? (
                    <RuxTableCell>
                      <MneumonicPopUp triggerValue={value} />
                    </RuxTableCell>
                  ) : (
                    <RuxTableCell>{value}</RuxTableCell>
                  )
                )}
              </RuxTableRow>
            ))}
          </RuxTableBody>
        </RuxTable>
      </RuxContainer>
      <LineChart />
    </div>
  );
};

export default Watcher;
