import { ReactNode } from "react";

import type { Status } from "@astrouxds/astro-web-components/dist/types/common/commonTypes.module";
export type { Status };

export type SubscribeOptions = {
  initial?: number;
  interval?: number;
  limit?: number;
};

export type Unsubscribe = () => void;

export type RangeOptions =
  | number
  | { start: number; stop: number; step?: number };

export type BetweenOptions =
  | number
  | { min?: number; max?: number; precision?: number };

export type AlertsPercentage =
  | 0
  | 2
  | 3
  | 4
  | 5
  | 10
  | 12
  | 15
  | 20
  | 25
  | 34
  | 50;

export type rowDataValue = Status | string | number;

export type rowDataObject = {
  [key: string]: rowDataValue;
};

export type Children = {
  children: ReactNode;
};

export type GenerateOptions = {
  initial: number;
  interval: number;
  limit: number;
};
