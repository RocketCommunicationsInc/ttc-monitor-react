import { Status } from "./types";

export type rowDataValue = Status | string | number;

export type rowDataObject = {
  [key: string]: rowDataValue;
};
