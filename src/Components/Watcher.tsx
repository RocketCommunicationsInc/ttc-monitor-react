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
  RuxPopUp,
  RuxMenu,
  RuxCheckbox,
  RuxIcon,
} from "@astrouxds/react";
import type { rowDataObject, Status } from "../Types";
import LineChart from "../Components/Watcher/LineChart";

const styles = {
  container: {
    display: "flex",
    fontWeight: "bold",
  },
  popUpMenuDiv: {
    paddingRight: "3rem",
    paddingLeft: "1rem",
    marginBlock: ".5rem",
  },
  volts: {
    marginLeft: "4rem",
    fontWeight: "var(--font-weights-bold)",
  },
  altitudeLink: {
    marginLeft: "1.5rem",
  },
  boldPopUpWords: {
    fontWeight: "var(--font-weights-bold)",
  },
  popUpValue: {
    textDecoration: "underline",
    textDecorationStyle: "dashed",
    color: "var(--color-palette-brightblue-300)",
  },
  popUpMargin: {
    marginBlock: ".5rem",
  },
};

const watcherDataItem = {
  status: "caution" as const,
  Mneumonic: 19999999,
  Unit: "000011111",
  Threshold: 450,
  Actual: "Full",
};

const fixtureData = Array(5).fill(watcherDataItem);

const Watcher = () => {
  return (
    <RuxContainer className="watcher">
      <div slot="header" style={styles.container}>
        Watcher
      </div>
      <div slot="toolbar" style={styles.container}>
        IRON 4090
      </div>
      <div className="watcher-body">
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
                    <RuxPopUp placement="right">
                      <RuxMenu>
                        <div style={styles.popUpMenuDiv}>
                          <span style={styles.boldPopUpWords}>PWBVTLM</span>
                          <div style={styles.popUpMargin}>
                            <div>
                              Value
                              <span style={styles.volts}>24.2 Volts</span>
                            </div>
                            <div>
                              Subsystem
                              <span style={styles.altitudeLink}>
                                <a
                                  href="https://ttc-investigate.astrouxds.com/?system=Attitude"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Altitude
                                </a>
                                <RuxIcon size="1rem" icon="launch" />
                              </span>
                            </div>
                          </div>
                          <RuxCheckbox>
                            <span style={styles.boldPopUpWords}>
                              Add to Watcher
                            </span>
                          </RuxCheckbox>
                        </div>
                      </RuxMenu>
                      <RuxTableCell style={styles.popUpValue} slot="trigger">
                        {value}
                      </RuxTableCell>
                    </RuxPopUp>
                  ) : (
                    <RuxTableCell>{value}</RuxTableCell>
                  )
                )}
              </RuxTableRow>
            ))}
          </RuxTableBody>
        </RuxTable>
        <LineChart />
      </div>
    </RuxContainer>
  );
};

export default Watcher;
