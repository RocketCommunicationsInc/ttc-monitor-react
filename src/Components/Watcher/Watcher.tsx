import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  RuxContainer,
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxAccordion,
  RuxAccordionItem,
  RuxNotification,
} from "@astrouxds/react";
import { Mnemonic } from "@astrouxds/mock-data/dist/types";
import LineChart from "./LineChart";
import WatcherListItem from "./WatcherListItem";
import { generateMnemonics } from "@astrouxds/mock-data";
import "./Watcher.css";

const styles = {
  container: {
    display: "flex",
  },
};

const generateMnemonicValue = () =>
  faker.number.float({ max: 110, precision: 0.1 });

const generateChartData = () =>
  faker.helpers.multiple(() => generateMnemonicValue(), { count: 9 });

const mnemonicsData = generateMnemonics(10);
const updatedMnemoncicsData = mnemonicsData.map((data) => {
  return {
    ...data,
    previousReadings: generateChartData(),
  };
});

const Watcher = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openBanner, setOpenBanner] = useState(false);

  useEffect(() => {
    const watcherDiv = document.querySelector(".watcher");
    const tableRows = watcherDiv?.querySelectorAll("rux-table-row");
    //sets first menmonic as selected on mount
    tableRows?.[0].setAttribute("selected", "");

    tableRows?.forEach((row) => {
      row.addEventListener("click", (event) => toggleSelected(event));
    });

    const toggleSelected = (event: any) => {
      const watcherDiv = document.querySelector(".watcher");
      const tableRows = watcherDiv?.querySelectorAll("rux-table-row");
      const closestRow = event.target.closest("rux-table-row");

      if (!closestRow || event.target.nodeName === "RUX-INPUT") return;
      tableRows?.forEach((row) => {
        row.removeAttribute("selected");
      });
      closestRow.setAttribute("selected", "");

      setSelectedIndex(Number(closestRow.dataset.index));
    };
  }, []);

  return (
    <div className="watcher">
      <RuxContainer>
        <div slot="header" style={styles.container}>
          Watcher
        </div>
        <RuxNotification
          small
          closeAfter={3}
          onRuxclosed={() => setOpenBanner(false)}
          open={openBanner}
        >
          This feature has not been implemented.
        </RuxNotification>
        <RuxAccordion>
          <RuxAccordionItem expanded>
            <span slot="label">IRON 4090</span>
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
                    <RuxTableHeaderCell>
                      {/* placeholder for actions menu column */}
                    </RuxTableHeaderCell>
                  </RuxTableHeaderRow>
                </RuxTableHeader>
                <RuxTableBody>
                  {updatedMnemoncicsData.map(
                    (
                      dataObj: Mnemonic & { previousReadings: number[] },
                      index
                    ) => {
                      const lastDataPoint =
                        dataObj.previousReadings.at(-1) || 0;
                      const chartDataSlope =
                        lastDataPoint - dataObj.previousReadings[0];
                      return (
                        <WatcherListItem
                          rowData={dataObj}
                          chartDataSlope={chartDataSlope}
                          index={index}
                          setOpenBanner={setOpenBanner}
                        />
                      );
                    }
                  )}
                </RuxTableBody>
              </RuxTable>
            </div>
          </RuxAccordionItem>
        </RuxAccordion>
      </RuxContainer>
      <div className="canvas-wrapper">
        <LineChart
          data={updatedMnemoncicsData[selectedIndex]}
          chartData={updatedMnemoncicsData[selectedIndex].previousReadings}
        />
      </div>
    </div>
  );
};

export default Watcher;
