import { useState, useEffect } from "react";
import {
  RuxContainer,
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTree,
  RuxTreeNode,
} from "@astrouxds/react";
import type { Mnemonic } from "../../Types";
import LineChart from "./LineChart";
import WatcherListItem from "./WatcherListItem";
import { generateMnemonics } from "../../data/generators/mnemonics/generate-mnemonics";

const styles = {
  container: {
    display: "flex",
  },
};

const mnemonicsData = generateMnemonics(20);

const Watcher = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const watcherDiv = document.querySelector(".watcher");
    const tableRows = watcherDiv?.querySelectorAll("rux-table-row");
    //sets first menmonic as selected on mount
    tableRows?.[0].setAttribute("selected", "");

    tableRows?.forEach((row) => {
      row.addEventListener("click", () => toggleSelected(row));
    });

    const toggleSelected = (element: HTMLElement) => {
      tableRows?.forEach((row, index) => {
        row.removeAttribute("selected");
      });
      element.setAttribute("selected", "");
      setSelectedIndex(Number(element.dataset.index));
    };
  }, []);

  return (
    <div className="watcher">
      <RuxContainer>
        <div slot="header" style={styles.container}>
          Watcher
        </div>
        <RuxTree>
          <RuxTreeNode expanded>
            IRON 4090
            <RuxTreeNode slot="node">
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
                    {mnemonicsData.map((dataObj: Mnemonic, index) => (
                      <WatcherListItem rowData={dataObj} index={index} />
                    ))}
                  </RuxTableBody>
                </RuxTable>
              </div>
            </RuxTreeNode>
          </RuxTreeNode>
        </RuxTree>
      </RuxContainer>
      <div className="canvas-wrapper">
        <LineChart data={mnemonicsData[selectedIndex]} />
      </div>
    </div>
  );
};

export default Watcher;
