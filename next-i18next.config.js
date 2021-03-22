const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'vn',
    locales: ['vn', 'en'],
  },
  localePath: path.resolve('./public/static/locales'),
  ns: 'common',
  defaultNS: 'common',
  react: {
    useSuspense: false,
    wait: true,
  },
};
