import type { Status } from "@astrouxds/astro-web-components/dist/types/common/commonTypes.module";

export type rowDataValue = Status | string | number;

export type rowDataObject = {
  [key: string]: rowDataValue;
};
