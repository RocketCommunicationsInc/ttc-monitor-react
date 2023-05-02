import { RuxContainer, RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableRow, RuxTableCell, RuxTableBody} from '@astrouxds/react'
import LineChart from './LineChart'

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
                  <RuxTableHeaderCell>Mnemonic</RuxTableHeaderCell>
                  <RuxTableHeaderCell>Unit</RuxTableHeaderCell>
                  <RuxTableHeaderCell>Threshold</RuxTableHeaderCell>
                  <RuxTableHeaderCell>Actual</RuxTableHeaderCell>
              </RuxTableHeaderRow>
          </RuxTableHeader>
          <RuxTableBody>
              <RuxTableRow>
                  <RuxTableCell>19999999</RuxTableCell>
                  <RuxTableCell>000011111</RuxTableCell>
                  <RuxTableCell>450</RuxTableCell>
                  <RuxTableCell>Full</RuxTableCell>
              </RuxTableRow>
              <RuxTableRow>
                  <RuxTableCell>19999999</RuxTableCell>
                  <RuxTableCell>000011111</RuxTableCell>
                  <RuxTableCell>450</RuxTableCell>
                  <RuxTableCell>Full</RuxTableCell>
              </RuxTableRow>
              <RuxTableRow>
                  <RuxTableCell>19999999</RuxTableCell>
                  <RuxTableCell>000011111</RuxTableCell>
                  <RuxTableCell>450</RuxTableCell>
                  <RuxTableCell>Full</RuxTableCell>
              </RuxTableRow>
          </RuxTableBody>
        </RuxTable>
        <LineChart />
      </div>

    </RuxContainer>
  )
}

export default Watcher