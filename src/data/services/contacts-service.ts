import { generateContact } from '../lib/contacts/generate-contact';
import { generateContacts } from '../lib/contacts/generate-contacts';
import type {
  Contact,
  ContactOptions,
  ContactsServiceOptions,
  ModifyContactParams,
  SubscribeOptions,
  Unsubscribe,
} from '../types';

export class ContactsService {
  private _data: Contact[] = [];
  private _eventName = 'contacts';
  private _subscribers: { [key: string]: Function[] } = {};
  private _contactOptions: ContactOptions = {};
  private _subscribeOptions: SubscribeOptions = {};

  constructor(options?: ContactsServiceOptions) {
    this._contactOptions = {
      alertsPercentage: options?.alertsPercentage,
      dateRef: options?.dateRef,
      daysRange: options?.daysRange,
      secondAlertPercentage: options?.secondAlertPercentage,
    };

    this._subscribeOptions = {
      initial: options?.initial,
      interval: options?.interval,
      limit: options?.limit,
    };
  }

  private _findIndex(id: string): number {
    return this._data.findIndex((contact) => contact.id === id);
  }

  private _publish(contacts: Contact[]) {
    if (!Array.isArray(this._subscribers[this._eventName])) return;

    this._subscribers[this._eventName].forEach((callback) => {
      callback(contacts);
    });
  }

  public subscribe(callback: (contacts: Contact[]) => void): Unsubscribe {
    if (!Array.isArray(this._subscribers[this._eventName])) {
      this._subscribers[this._eventName] = [];
    }

    this._subscribers[this._eventName].push(callback);
    const initial = this._subscribeOptions.initial;
    this._data = generateContacts(initial, this._contactOptions);
    this._publish(this._data);

    const limit = this._subscribeOptions.limit || 200;
    const index = this._subscribers[this._eventName].length - 1;
    const interval = setInterval(() => {
      if (this._data.length >= limit) return;
      this.addContact();
    }, (this._subscribeOptions.interval || 5) * 1000);

    return () => {
      clearInterval(interval);
      this._subscribers[this._eventName].splice(index, 1);
    };
  }

  public addContact(): Contact {
    const index = this._data.length - 1;
    const addedContact = generateContact(index, this._contactOptions);
    this._data = [...this._data, addedContact];
    this._publish(this._data);
    return addedContact;
  }

  public modifyContact(id: string, params: ModifyContactParams): string {
    const index = this._findIndex(id);
    Object.entries(params).forEach(([key, value]) => {
      // @ts-expect-error key will be a contact property
      this._data[index][key] = value;
    });
    this._publish(this._data);
    return `Successfully modified contact: ${id}`;
  }

  public deleteContact(id: string): string {
    const index = this._findIndex(id);
    this._data.splice(index, 1);
    this._publish(this._data);
    return `Successfully deleted contact: ${id}`;
  }
}
