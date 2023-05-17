import type { Status } from "@astrouxds/astro-web-components/dist/types/common/commonTypes.module";

export type Alert = {
  id: string;
  status: Status;
  category: Category;
  message: string;
  longMessage: string;
  timestamp: number;
  selected: boolean;
  new: boolean;
  expanded: boolean;
  acknowledged: boolean;
  refId: string;
};

export type Category = "hardware" | "software" | "spacecraft"

export type ModifyAlertParams = {
  id: string;
  selected?: boolean;
  new?: boolean;
  expanded?: boolean;
  acknowledged: boolean;
};

export type AlertOptions = {
  refId?: string;
  equipment?: string;
  start?: string | number | Date;
  end?: string | number | Date;
  createdRef?: string | number | Date;
};
