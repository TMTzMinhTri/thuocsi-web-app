const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  vn: 'vn',
  en: 'en',
};

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.log = function () {};
  console.debug = function () {};
  console.warn = function () {};
  console.info = function () {};
}

module.exports = {
  images: {
    domains: ['assets.thuocsi.vn'],
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
