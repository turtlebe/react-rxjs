import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultLocaleKey, Locale, locales } from 'theme/icons/locales';
import en from '../locales/en/translation.json';
import de from '../locales/de/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: false,
    },
  });

i18n.addResourceBundle('en', 'translations', en);
i18n.addResourceBundle('de', 'translations', de);

if (!locales.includes(i18n.language as Locale)) {
  i18n.changeLanguage(defaultLocaleKey);
}

export { i18n };
