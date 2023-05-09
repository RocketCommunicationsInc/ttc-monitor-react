import { generateAlert } from "./generate-alert";
import type { AlertOptions } from "../../../Types";

export const generateAlerts = (length: number = 40, options?: AlertOptions) => {
  return Array.from({ length }, () => generateAlert(options));
};
