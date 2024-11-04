import { enUS } from '@src/i18n/en-US';

export type langDictionary = {
  [key: string]: string;
};

export const $t = (key: string) => {
  //todo: can detect a different language

  //@ts-ignore
  return enUS[key] ?? '';
};