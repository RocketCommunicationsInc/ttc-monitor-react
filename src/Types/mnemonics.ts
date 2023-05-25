import type { Status } from "@astrouxds/astro-web-components/dist/types/common/commonTypes.module";

export type Mnemonic = {
  status: Status;
  mnemonic: string;
  unit: string;
  threshold: number;
  value: number;
  // subsystem: string;
  chartData: number[];
  trendingUp: boolean;
};
