import { RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableRow, RuxTableCell, RuxTableBody} from '@astrouxds/react'

const CostellationList = () => {

  return (
    
<RuxTable>
    <RuxTableHeader>
        <RuxTableHeaderRow>
            <RuxTableHeaderCell>Status</RuxTableHeaderCell>
            <RuxTableHeaderCell>Satellite</RuxTableHeaderCell>
            <RuxTableHeaderCell>Next Pass</RuxTableHeaderCell>
            <RuxTableHeaderCell>AOS</RuxTableHeaderCell>
            <RuxTableHeaderCell>LOS</RuxTableHeaderCell>
            <RuxTableHeaderCell>Ground Station</RuxTableHeaderCell>
            <RuxTableHeaderCell>Azimuth</RuxTableHeaderCell>
            <RuxTableHeaderCell>Elevation</RuxTableHeaderCell>
            <RuxTableHeaderCell>State</RuxTableHeaderCell>
            <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
    </RuxTableHeader>
    <RuxTableBody>
        <RuxTableRow>
            <RuxTableCell>19999999</RuxTableCell>
            <RuxTableCell>000011111</RuxTableCell>
            <RuxTableCell>450</RuxTableCell>
            <RuxTableCell>Full</RuxTableCell>
            <RuxTableCell>2020 158 01:23:45:678</RuxTableCell>
            <RuxTableCell>OBTYPE_5</RuxTableCell>
            <RuxTableCell>150</RuxTableCell>
            <RuxTableCell>3500</RuxTableCell>
            <RuxTableCell>7500</RuxTableCell>
            <RuxTableCell>100</RuxTableCell>
        </RuxTableRow>
        <RuxTableRow>
            <RuxTableCell>19999999</RuxTableCell>
            <RuxTableCell>000011111</RuxTableCell>
            <RuxTableCell>450</RuxTableCell>
            <RuxTableCell>Full</RuxTableCell>
            <RuxTableCell>2020 158 01:23:45:678</RuxTableCell>
            <RuxTableCell>OBTYPE_5</RuxTableCell>
            <RuxTableCell>150</RuxTableCell>
            <RuxTableCell>3500</RuxTableCell>
            <RuxTableCell>7500</RuxTableCell>
            <RuxTableCell>100</RuxTableCell>
        </RuxTableRow>
        <RuxTableRow>
            <RuxTableCell>19999999</RuxTableCell>
            <RuxTableCell>000011111</RuxTableCell>
            <RuxTableCell>450</RuxTableCell>
            <RuxTableCell>Full</RuxTableCell>
            <RuxTableCell>2020 158 01:23:45:678</RuxTableCell>
            <RuxTableCell>OBTYPE_5</RuxTableCell>
            <RuxTableCell>150</RuxTableCell>
            <RuxTableCell>3500</RuxTableCell>
            <RuxTableCell>7500</RuxTableCell>
            <RuxTableCell>100</RuxTableCell>
        </RuxTableRow>
    </RuxTableBody>
</RuxTable>
  )
}

export default CostellationList