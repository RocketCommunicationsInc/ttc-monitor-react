import { AlertOptions } from '../../types';
import { generateAlert } from './generate-alert';

export const generateAlerts = (length: number = 40, options?: AlertOptions) => {
  return Array.from({ length }, () => generateAlert(options));
};
