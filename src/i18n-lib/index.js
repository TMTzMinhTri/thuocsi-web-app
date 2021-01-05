const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

export const i18n = new NextI18Next({
  // otherLanguages: ['en'],
  defaultLanguage: 'vn',
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  debug: false,
  ns: 'common',
  defaultNS: 'common',
});

export default i18n;
