import { getFlagForLocale, Locale } from 'theme/icons/locales';

export const renderFlag = (locale: Locale) => {
  const Flag = getFlagForLocale(locale);
  return <Flag />;
};
