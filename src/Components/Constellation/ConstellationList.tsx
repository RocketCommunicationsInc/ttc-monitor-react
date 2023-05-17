import { useState } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxIcon,
} from "@astrouxds/react";
import { Contact } from "../../Types/contacts";

type PropTypes = {
  contacts: { [key: string]: Contact };
  contactIds: string[];
};

type SortDirection = "ASC" | "DESC";

const CostellationList = ({ contacts, contactIds }: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");
  const [sortProp, setSortProp] = useState<keyof Contact>("id");
  const [sortedContactIds, setSortedContactIds] =
    useState<string[]>(contactIds);

  const handleClick = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Contact;
    if (sortProperty === sortProp) {
      // clicked same currently sorted column
      if (sortDirection === "ASC") {
        setSortDirection("DESC");
        sortContacts(sortProperty, "DESC");
      } else {
        setSortDirection("ASC");
        sortContacts(sortProperty, "ASC");
      }
    } else {
      // clicked new column
      setSortProp(sortProperty);
      sortContacts(sortProperty, "ASC");
      setSortDirection("ASC");
    }
  };

  const sortContacts = (
    property: keyof Contact,
    sortDirection: SortDirection
  ) => {
    const newSortedContactIds = [...sortedContactIds].sort(
      (a: string, b: string) => {
        const firstContact = contacts[a];
        const secondContact = contacts[b];
        const firstContactValue = firstContact[property as keyof Contact];
        const secondContactValue = secondContact[property as keyof Contact];
        if (sortDirection !== "ASC") {
          return String(firstContactValue).localeCompare(
            String(secondContactValue)
          );
        } else {
          return String(secondContactValue).localeCompare(
            String(firstContactValue)
          );
        }
      }
    );
    setSortedContactIds(newSortedContactIds);
  };

  return (
    <RuxTable className="constellation-table">
      <RuxTableHeader>
        <RuxTableHeaderRow className="constellation-table-header-row">
          <RuxTableHeaderCell data-sortprop="status" onClick={handleClick} class="constellation-t-header-cell">
            Status
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "status" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="satellite" onClick={handleClick} class="constellation-t-header-cell">
            Satellite
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "satellite" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="rev" onClick={handleClick} class="constellation-t-header-cell">
            Next Pass
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "rev" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="aos" onClick={handleClick} class="constellation-t-header-cell">
            AOS
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "aos" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="los" onClick={handleClick} class="constellation-t-header-cell">
            LOS
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "los" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="ground" onClick={handleClick} class="constellation-t-header-cell">
            Ground Station
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "ground" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="azimuth" onClick={handleClick} class="constellation-t-header-cell">
            Azimuth
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "azimuth" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="elevation" onClick={handleClick} class="constellation-t-header-cell">
            Elevation
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "elevation" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="state" onClick={handleClick} class="constellation-t-header-cell">
            State
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "state" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell class="constellation-t-header-cell">Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody className="constellation-table-body">
        {sortedContactIds.map((contactId) => {
          const contact = contacts[contactId];
          return (
            <RuxTableRow key={contactId} className="constellation-table-row">
              <RuxTableCell id="c-t-cell-1" className="constellation-table-cell">
                {contact.status}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.satellite}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.rev}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.aos}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.los}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.ground}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.azimuth}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.elevation}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                {contact.state}
              </RuxTableCell>
              <RuxTableCell className="constellation-table-cell">
                <RuxIcon icon="more-horiz" size="small" />
              </RuxTableCell>
            </RuxTableRow>
          );
        })}
      </RuxTableBody>
    </RuxTable>
  );
};

export default CostellationList;
