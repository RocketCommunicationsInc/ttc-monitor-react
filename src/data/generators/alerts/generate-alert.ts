import { faker } from "@faker-js/faker";

import dataOption from "../../options/options";
import { between, generateEquipment, shuffle } from "../../utils";
import type { Alert, AlertOptions, Category, Status } from "../../../Types";

export const generateAlert = (options?: AlertOptions): Alert => {
  let date = faker.date.recent({ days: 1, refDate: options?.createdRef });

  if (options?.start && options?.end && !options.createdRef) {
    date = faker.date.between({ from: options.start, to: options.end });
  }

  const equipments = (options?.equipment || generateEquipment()).split(" ");
  const singleEquipment = equipments[between(equipments.length - 1)];
  const errorType = shuffle(dataOption.errorTypes);
  const message = `${singleEquipment} - ${errorType}`;
  const adverb = faker.word.adverb();
  const hhmmss = date.toTimeString().split(" ")[0];
  const longMessage = `${singleEquipment} ${adverb} ${errorType.toLowerCase()} at ${hhmmss}`;

  return {
    id: faker.string.uuid(),
    refId: options?.refId || "",
    category: shuffle<Category>(dataOption.categories),
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
