import { generateContact } from "./generate-contact";
import type { ContactOptions } from "../../../Types";

export const generateContacts = (
  length: number = 100,
  options?: ContactOptions
) => Array.from({ length }, (_, i) => generateContact(i, options));
