import { Alert } from './alert';
import { AlertsPercentage, Status, SubscribeOptions } from './util';

export type ContactOptions = {
  alertsPercentage?: AlertsPercentage;
  secondAlertPercentage?: AlertsPercentage;
  daysRange?: number;
  dateRef?: string | number | Date;
};

export type ContactsServiceOptions = ContactOptions & SubscribeOptions;
export type OnContactChangeOptions = ContactOptions & SubscribeOptions;

export type Contact = {
  id: string;
  status: Status;
  name: number;
  ground: string;
  rev: number;
  satellite: string;
  equipment: string;
  state: string;
  step: string;
  detail: string;
  beginTimestamp: number;
  endTimestamp: number;
  aos: number;
  los: number;
  latitude: number;
  longitude: number;
  azimuth: number;
  elevation: number;
  resolution: string;
  resolutionStatus: string;
  alerts: Alert[];
};

export type ModifyContactParams = {
  ground?: string;
  satellite?: string;
  equipment?: string;
  state?: string;
  step?: string;
  detail?: string;
  beginTimestamp?: number;
  endTimestamp?: number;
  resolution?: string;
  resolutionStatus?: string;
};
