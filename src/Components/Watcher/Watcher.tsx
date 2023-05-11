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
import MneumonicPopUp from "./MneumonicPopUp";

const styles = {
  container: {
    display: "flex",
  },
};

const watcherDataItem = {
  status: "caution" as const,
  mneumonic: "PWST2IA",
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
        <div slot="toolbar" style={styles.container}>
          IRON 4090
        </div>
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              {Object.keys(fixtureData[0]).map((key) => (
                <RuxTableHeaderCell key={key}>
                  {key === "status" ? "" : key}
                </RuxTableHeaderCell>
              ))}
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
                  ) : key === "Mneumonic" ? (
                    <RuxTableCell>
                      <MneumonicPopUp triggerValue={value} />
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
      </RuxContainer>
      <LineChart />
    </div>
  );
};

export default Watcher;
