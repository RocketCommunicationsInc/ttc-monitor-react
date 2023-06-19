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
  RuxNotification,
  RuxButton,
} from "@astrouxds/react";
import type { Contact } from "@astrouxds/mock-data";

type PropTypes = {
  contacts: { [key: string]: Contact };
  contactIds: string[];
  toggleDrawer: (id?: string) => void;
};

type SortDirection = "ASC" | "DESC";

const CostellationList = ({
  contacts,
  contactIds,
  toggleDrawer,
}: PropTypes) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");
  const [sortProp, setSortProp] = useState<keyof Contact>("id");
  const [sortedContactIds, setSortedContactIds] =
    useState<string[]>(contactIds);
  const [openFeatureUnavailable, setOpenFeatureUnavailable] = useState(false);
  const [openPrePassBanner, setOpenPrePassBanner] = useState(false);

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

  const popupMenuHandler = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setOpenFeatureUnavailable(true);
  };

  const prePasshandler = (e: MouseEvent<HTMLRuxIconElement>) => {
    e.stopPropagation();
    setOpenPrePassBanner(true);
  };

  return (
    <>
      <RuxNotification
        open={openPrePassBanner}
        onRuxclosed={() => setOpenPrePassBanner(false)}
      >
        Pre-Pass for is about to begin.
        <span onClick={popupMenuHandler}>Open Contact</span>
        <RuxButton
          iconOnly
          borderless
          icon="launch"
          onClick={popupMenuHandler}
        />
      </RuxNotification>
      <RuxNotification
        small
        closeAfter={3}
        onRuxclosed={() => setOpenFeatureUnavailable(false)}
        open={openFeatureUnavailable}
      >
        This feature has not been implemented.
      </RuxNotification>
      <div className="table-wrapper">
        <RuxTable>
          <RuxTableHeader>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell data-sortprop="status" onClick={handleClick}>
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
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
                Satellite
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "satellite" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="rev" onClick={handleClick}>
                Next Pass
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "rev" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="aos" onClick={handleClick}>
                AOS
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "aos" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="los" onClick={handleClick}>
                LOS
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
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
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  constellation-formatting
                  className={sortProp === "status" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="ground" onClick={handleClick}>
                Ground Station
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "ground" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="azimuth" onClick={handleClick}>
                Azimuth
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
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
              >
                Elevation
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
                      ? "arrow-drop-down"
                      : "arrow-drop-up"
                  }
                  size="small"
                  className={sortProp === "elevation" ? "visible" : "hidden"}
                />
              </RuxTableHeaderCell>
              <RuxTableHeaderCell data-sortprop="state" onClick={handleClick}>
                State
                <RuxIcon
                  icon={
                    sortDirection === "ASC"
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
                <RuxTableRow
                  key={contactId}
                  onClick={() => toggleDrawer(contactId)}
                >
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  {contact.state === "ready" ? (
                    <RuxTableCell>
                      {contact.satellite}
                      <RuxIcon
                        id="sat-icon"
                        size="1rem"
                        icon="launch"
                        onClick={prePasshandler}
                      />
                    </RuxTableCell>
                  ) : (
                    <RuxTableCell>{contact.satellite}</RuxTableCell>
                  )}
                  <RuxTableCell>{contact.rev}</RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.aos).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    {new Date(contact.los).toTimeString().slice(0, 8)}
                  </RuxTableCell>
                  <RuxTableCell>
                    <RuxStatus status={contact.status} />
                  </RuxTableCell>
                  <RuxTableCell>{contact.ground}</RuxTableCell>
                  <RuxTableCell>
                    {contact.azimuth.toString().slice(0, 7)}&deg;
                  </RuxTableCell>
                  <RuxTableCell>{contact.elevation}&deg;</RuxTableCell>
                  <RuxTableCell id="state-t-cell">{contact.state}</RuxTableCell>
                  <RuxPopUp placement="bottom" closeOnSelect>
                    <RuxMenu>
                      <RuxMenuItem onClick={popupMenuHandler}>
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

export default CostellationList;
