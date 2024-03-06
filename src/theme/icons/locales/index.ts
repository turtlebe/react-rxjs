import { DeDEFlag } from './de-DE';
import { EnUSFlag } from './en-US';

const LocaleMap = {
  'de-DE': DeDEFlag,
  'en-US': EnUSFlag,
};

export const defaultLocaleKey = 'de-DE';

export type Locale = keyof typeof LocaleMap;
export const locales = Object.keys(LocaleMap) as Locale[];

export const getFlagForLocale = (locale: Locale) => LocaleMap[locale];
