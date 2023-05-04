import { ContactOptions } from '../../types';
import { generateContact } from './generate-contact';

export const generateContacts = (
  length: number = 100,
  options?: ContactOptions,
) => Array.from({ length }, (_, i) => generateContact(i, options));
