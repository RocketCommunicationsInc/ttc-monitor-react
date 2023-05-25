import { faker } from "@faker-js/faker";

import dataOption from "../../options/options";
import { shuffle } from "../../utils";
import type { Mnemonic, Status } from "../../../Types";

export const generateMnemonic = (): Mnemonic => {
  const chartData = faker.helpers.multiple(
    () => faker.number.float({ max: 110, precision: 0.1 }),
    { count: 9 }
  );
  const averageOfChartData =
    chartData.reduce((a, b) => a + b) / chartData.length;
  const chartDataSlope = chartData[chartData.length - 1] - chartData[0];

  return {
    status: shuffle<Status>(dataOption.statuses),
    mnemonic: faker.string.alpha({ length: 7, casing: "upper" }),
    unit: shuffle(dataOption.units),
    threshold: faker.number.float({ max: 110, precision: 0.1 }),
    value: Number(averageOfChartData.toFixed(1)),
    // subsystem: shuffle(dataOption.subsystems),
    chartData: chartData,
    trendingUp: chartDataSlope >= 0,
  };
};
