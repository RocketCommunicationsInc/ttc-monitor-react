import { faker } from '@faker-js/faker';

import dataOption from '../../data/options';
import percentages from '../../data/percentages';
import { Contact, ContactOptions, Status } from '../../types';
import { generateAlert } from '../alerts/generate-alert';
import {
  between,
  generateEquipment,
  randomMinutes,
  randomSeconds,
  range,
  setModulus,
  setSecondModulus,
  shuffle,
} from '../../utils';

export const generateContact = (
  index: number,
  options?: ContactOptions,
): Contact => {
  if (options?.alertsPercentage) {
    const keys = Object.keys(percentages);
    const hasPercentage = keys.includes(options.alertsPercentage.toString());

    if (!hasPercentage) {
      const message = `options.alertsPercentage of ${options.alertsPercentage}% is not allowed.`;
      throw new Error(message);
    }
  }

  const count = index + 1;
  const contactId = faker.datatype.uuid();
  const modulus = setModulus(options?.alertsPercentage);
  const secondModulus = setSecondModulus(options?.secondAlertPercentage);
  const hasAlert = count % modulus === 0;
  const hasSecondAlert = count % secondModulus === 0;
  const alertsRange = hasAlert ? { start: 0, stop: hasSecondAlert ? 1 : 0 } : 0;

  // 1) start timestamp base off n number of days in the past
  const start = faker.date.recent(options?.daysRange, options?.dateRef);
  const beginTimestamp = start.getTime();

  // 2) end timestamp based off start and generates a random timestamp
  // between 20 and 60 minutes in the future
  const end = new Date(beginTimestamp + randomMinutes(20, 60));
  const endTimestamp = end.getTime();

  // 3) AOS (Acquisition of Signal) random number of seconds after start
  const aos = beginTimestamp + randomSeconds(60, 300);

  // 4) LOS (Loss of Signal) random number of seconds before end
  const los = endTimestamp - randomSeconds(60, 300);

  const equipment = generateEquipment();

  return {
    id: contactId,
    status: shuffle<Status>(dataOption.statuses),
    name: faker.datatype.number(),
    ground: shuffle(dataOption.grounds),
    rev: faker.datatype.number({ min: 1001, max: 9999 }),
    satellite: 'USA-' + faker.random.alphaNumeric(5).toUpperCase(),
    equipment,
    state: shuffle(dataOption.states),
    step: shuffle(dataOption.steps),
    detail: faker.lorem.sentence(between({ min: 8, max: 20 })),
    beginTimestamp,
    endTimestamp,
    aos,
    los,
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    azimuth: parseFloat(faker.address.longitude()),
    elevation: faker.datatype.float({ max: 90 }),
    resolution: shuffle(dataOption.resolutions),
    resolutionStatus: shuffle(dataOption.resolutionStatuses),
    alerts: range(alertsRange).map(() => {
      return generateAlert({ end, equipment, refId: contactId, start });
    }),
  };
};
