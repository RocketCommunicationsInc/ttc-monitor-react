import { generateMnemonic } from "./generate-mnemonic";

export const generateMnemonics = (length: number = 40) => {
  return Array.from({ length }, () => generateMnemonic());
};
