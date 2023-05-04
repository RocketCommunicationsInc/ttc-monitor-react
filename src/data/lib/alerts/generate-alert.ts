import { faker } from '@faker-js/faker';

import dataOption from '../../data/options';
import { Alert, AlertOptions, Status } from '../../types';
import { between, generateEquipment, shuffle } from '../../utils';

export const generateAlert = (options?: AlertOptions): Alert => {
  let date = faker.date.recent(1, options?.createdRef);

  if (options?.start && options?.end && !options.createdRef) {
    date = faker.date.between(options.start, options.end);
  }

  const equipments = (options?.equipment || generateEquipment()).split(' ');
  const singleEquipment = equipments[between(equipments.length - 1)];
  const errorType = shuffle(dataOption.errorTypes);
  const message = `${singleEquipment} - ${errorType}`;
  const adverb = faker.word.adverb();
  const hhmmss = date.toTimeString().split(' ')[0];
  const longMessage = `${singleEquipment} ${adverb} ${errorType.toLowerCase()} at ${hhmmss}`;

  return {
    id: faker.datatype.uuid(),
    refId: options?.refId || '',
    category: shuffle(dataOption.categories),
    expanded: false,
    longMessage,
    message,
    acknowledged: false,
    new: false,
    selected: false,
    timestamp: date.getTime(),
    status: shuffle<Status>(dataOption.statuses),
  };
};
