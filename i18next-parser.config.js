export default {
  createOldCatalogs: false,
  defaultValue: (locale, __, key) => (locale === 'en' ? key : `**${key}`),
  locales: ['en', 'de'],
  keySeparator: false,
  namespaceSeparator: false,
  sort: true,
};
