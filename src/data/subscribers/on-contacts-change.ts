import { generateContact } from '../lib/contacts/generate-contact';
import { generateContacts } from '../lib/contacts/generate-contacts';
import type {
  Contact,
  ContactOptions,
  OnContactChangeOptions,
  Unsubscribe,
} from '../types';

const contacts: Contact[] = [];
const eventName = 'contacts';
const subscribers: { [key: string]: Function[] } = {};

const publish = (contacts: Contact[]) => {
  if (!Array.isArray(subscribers[eventName])) return;

  subscribers[eventName].forEach((callback) => {
    callback(contacts);
  });
};

export const onContactsChange = (
  callback: (contacts: Contact[]) => void,
  options?: OnContactChangeOptions,
): Unsubscribe => {
  if (!Array.isArray(subscribers[eventName])) {
    subscribers[eventName] = [];
  }

  const contactOptions: ContactOptions = {
    alertsPercentage: options?.alertsPercentage,
    dateRef: options?.dateRef,
    daysRange: options?.daysRange,
    secondAlertPercentage: options?.secondAlertPercentage,
  };

  subscribers[eventName].push(callback);
  contacts.push(...generateContacts(options?.initial, contactOptions));
  publish(contacts);

  const limit = options?.limit || 200;
  const index = subscribers[eventName].length - 1;
  const interval = setInterval(() => {
    if (contacts.length >= limit) return;
    contacts.push(generateContact(contacts.length - 1, contactOptions));
    publish(contacts);
  }, (options?.interval || 5) * 1000);

  return () => {
    clearInterval(interval);
    subscribers[eventName].splice(index, 1);
  };
};
