import { useEffect } from "react"
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxIcon
} from "@astrouxds/react";
import useContacts  from "../../hooks/useContacts"

const CostellationList = () => {
  const { contacts, contactIds, initialize } =
  useContacts();

  useEffect(() => {
    initialize();
  }, [initialize]);

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
        {contactIds.map((contactId: string) => {
          const contact = contacts[contactId]
          return (
            <RuxTableRow key={contactId}>
              <RuxTableCell>{contact.status}</RuxTableCell>
              <RuxTableCell>{contact.satellite}</RuxTableCell>
              <RuxTableCell>{contact.rev}</RuxTableCell>
              <RuxTableCell>{contact.aos}</RuxTableCell>
              <RuxTableCell>{contact.los}</RuxTableCell>
              <RuxTableCell>{contact.ground}</RuxTableCell>
              <RuxTableCell>{contact.azimuth}</RuxTableCell>
              <RuxTableCell>{contact.elevation}</RuxTableCell>
              <RuxTableCell>{contact.state}</RuxTableCell>
              <RuxTableCell><RuxIcon icon="more-horiz" size="small"/></RuxTableCell>
            </RuxTableRow>
          )
        })}
      </RuxTableBody>
    </RuxTable>
  );
};

export default CostellationList;
