import { faker } from '@faker-js/faker';

import dataOption from '../data/options';
import percentages from '../data/percentages';
import { AlertsPercentage, BetweenOptions, RangeOptions } from '../types/util';

export const range = (options: RangeOptions): number[] => {
  if (typeof options === 'number') {
    return Array.from({ length: options }, (_, i) => 0 + i);
  }
  const { start, stop, step = 1 } = options;
  const length = (stop - start) / step + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

export const between = (options?: BetweenOptions) => {
  return faker.datatype.number(options);
};

export const shuffle = <T>(arr: T[]) => {
  const shuffled = faker.helpers.shuffle<T>(arr);
  return shuffled[between(arr.length - 1)];
};

export const generateEquipment = () => {
  const shuffled = faker.helpers.shuffle(dataOption.equipments);
  const prefixes = shuffled.slice(0, between({ min: 5, max: 7 }));
  const equipments = prefixes.map((prefix) => {
    return prefix + between({ min: 1, max: 20 });
  });

  return equipments.sort().join(' ').toUpperCase();
};

export const setModulus = (percentage?: AlertsPercentage) => {
  if (typeof percentage === 'number') return percentages[percentage];
  return 10;
};

export const setSecondModulus = (percentage?: AlertsPercentage) => {
  if (typeof percentage === 'number') return percentages[percentage];
  return 50;
};

export const randomMinutes = (min: number, max: number) => {
  return 1000 * 60 * between({ min, max });
};

export const randomSeconds = (min: number, max: number) => {
  return 1000 * between({ min, max });
};
