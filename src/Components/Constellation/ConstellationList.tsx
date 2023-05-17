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
    <RuxTable>
      <RuxTableHeader>
        <RuxTableHeaderRow>
          <RuxTableHeaderCell data-sortprop="status" onClick={handleClick}>
            Status
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "status" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="satellite" onClick={handleClick}>
            Satellite
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "satellite" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="rev" onClick={handleClick}>
            Next Pass
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "rev" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="aos" onClick={handleClick}>
            AOS
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "aos" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="los" onClick={handleClick}>
            LOS
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "los" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="ground" onClick={handleClick}>
            Ground Station
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "ground" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="azimuth" onClick={handleClick}>
            Azimuth
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "azimuth" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="elevation" onClick={handleClick}>
            Elevation
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "elevation" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell data-sortprop="state" onClick={handleClick}>
            State
            <RuxIcon
              icon={
                sortDirection === "ASC" ? "arrow-drop-down" : "arrow-drop-up"
              }
              size="small"
              className={sortProp === "state" ? "visible" : "hidden"}
            />
          </RuxTableHeaderCell>
          <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
        </RuxTableHeaderRow>
      </RuxTableHeader>
      <RuxTableBody>
        {sortedContactIds.map((contactId) => {
          const contact = contacts[contactId];
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
              <RuxTableCell>
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
