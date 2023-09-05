import { MouseEvent, useState } from "react";
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableRow,
  RuxTableCell,
  RuxTableBody,
  RuxIcon,
  RuxStatus,
  RuxPopUp,
  RuxMenu,
  RuxMenuItem,
} from "@astrouxds/react";
import type { Contact } from "@astrouxds/mock-data";
import LinkButtonWithIcon from "../LinkButtonWithIcon/LinkButtonWithIcon";
import { addToast } from "../../utils/index";

type PropTypes = {
  contacts: { [key: string]: Contact };
  contactIds: string[];
  toggleDrawer: (id?: string, passPlan?: boolean) => void;
};

type SortDirection = "ASC" | "DESC";

const ConstellationList = ({
  contacts,
  contactIds,
  toggleDrawer,
}: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");
  const [sortProp, setSortProp] = useState<keyof Contact>("id");
  const [sortedContactIds, setSortedContactIds] =
    useState<string[]>(contactIds);
  const [activeHeader, setActiveHeader] = useState<keyof Contact>();

  const handleClick = (event: any) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Contact;
    setActiveHeader(sortProperty);
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
        if (property === "status") {
          const statusOrder = [
            "off",
            "standby",
            "normal",
            "caution",
            "serious",
            "critical",
          ];
          const statusAsc = statusOrder.indexOf(contacts[a].status);
          const statusDesc = statusOrder.indexOf(contacts[b].status);
          if (sortDirection !== "ASC") {
            return statusAsc - statusDesc;
          } else {
            return statusDesc - statusAsc;
          }
        }
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
  const popupMenuHandler = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    addToast("This feature has not been implemented.", false, 3000);
  };

  return (
    <>
      <div className="table-wrapper">
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell data-sortprop="status" onClick={handleClick}>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "status"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "status" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop="satellite"
                onClick={handleClick}
              >
                <span>Satellite</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "satellite"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "satellite" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop="rev"
                onClick={handleClick}
                className="text-align-right"
              >
                <span>Next Pass</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "rev"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "rev" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                className="text-align-right"
                data-sortprop="aos"
                onClick={handleClick}
              >
                <span>AOS</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "aos"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "aos" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                className="text-align-right"
                data-sortprop="los"
                onClick={handleClick}
              >
                <span>LOS</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "los"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "los" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="status" onClick={handleClick}>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "status"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  constellation-formatting
                  className={sortProp === "status" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="ground" onClick={handleClick}>
                <span>Ground Station</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "ground"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "ground" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop="azimuth"
                onClick={handleClick}
                className="text-align-right"
              >
                <span>Azimuth</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "azimuth"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "azimuth" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell
                data-sortprop="elevation"
                onClick={handleClick}
                className="text-align-right"
              >
                <span>Elevation</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "elevation"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "elevation" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="state" onClick={handleClick}>
                <span>State</span>
                <RuxIcon
                  icon={
                    sortDirection === "ASC" || activeHeader !== "state"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
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
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  {contact.state === "ready" ? (
                    <RuxTableCell>
                      <LinkButtonWithIcon
                        onClick={() => toggleDrawer(contactId)}
                        text={contact.satellite}
                      />
                    </RuxTableCell>
                  ) : (
                    <RuxTableCell>{contact.satellite}</RuxTableCell>
                  )}
                  <RuxTableCell className="text-align-right">
                    {contact.rev}
                  </RuxTableCell>
                  <RuxTableCell className="text-align-right">
                    {new Date(contact.aos).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell className="text-align-right">
                    {new Date(contact.los).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  <RuxTableCell>{contact.ground}</RuxTableCell>
                  <RuxTableCell className="text-align-right degree">
                    {contact.azimuth.toString().slice(0, 6)}&deg;
                  </RuxTableCell>
                  <RuxTableCell className="text-align-right degree">
                    {contact.elevation.toString().slice(0, 6)}&deg;
                  </RuxTableCell>
                  <RuxTableCell id="state-t-cell">{contact.state}</RuxTableCell>
                  <RuxPopUp placement="bottom" closeOnSelect>
                    <RuxMenu>
                      <RuxMenuItem
                        onClick={() => toggleDrawer(contactId, true)}
                      >
                        View Pass Plan
                      </RuxMenuItem>
                      <RuxMenuItem onClick={popupMenuHandler}>
                        Playback Last Pass
                      </RuxMenuItem>
                    </RuxMenu>
                    <RuxTableCell slot="trigger">
                      <RuxIcon
                        icon="more-horiz"
                        size="1.5rem"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </RuxTableCell>
                  </RuxPopUp>
                </RuxTableRow>
              );
            })}
          </RuxTableBody>
        </RuxTable>
      </div>
    </>
  );
};

export default ConstellationList;
