import { RuxContainer, RuxStatus, RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableRow, RuxTableCell, RuxTableBody} from '@astrouxds/react'
import LineChart from './LineChart'

const watcherDataItem = {
  status: "caution" as Status,
  Mneumonic: 19999999,
  Unit: "000011111",
  Threshold: 450,
  Actual: "Full",
};

const fixtureData = Array(6).fill(watcherDataItem);

const Watcher = () => {
  return (
        <RuxContainer className="watcher">
      <div slot="header" style={{display: "flex"}}>
        Watcher
      </div>
      <div slot="toolbar" style={{display: "flex"}}>
        IRON 4090
      </div>
      <div className="watcher-body">
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              {Object.keys(fixtureData[0]).map((key) => <RuxTableHeaderCell>{key}</RuxTableHeaderCell>)}
              </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
            {fixtureData.map((dataObj) => (
              <RuxTableRow>
                <RuxStatus status={dataObj.status} />
                {Object.entries(datObj).map([key, value] => 
                <RuxTableCell>{key !== status ? value : null}</RuxTableCell>
                )}
                  
                </RuxTableRow>
              ))}
          </RuxTableBody>
        </RuxTable>
        <LineChart />
      </div>

    </RuxContainer>
  )
}

export default Watcher