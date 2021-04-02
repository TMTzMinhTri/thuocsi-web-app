if (process.env.NODE_ENV === 'PRODUCTION' || process.env.ENV === 'prd') {
  console.log = function () {};
  console.debug = function () {};
  console.warn = function () {};
  console.info = function () {};
}

module.exports = {
  images: {
    domains: ['assets.thuocsi.vn', 'storage.googleapis.com', 'www.facebook.com'],
  },
  async redirects() {
    return [
      {
        source: '/how-to-order',
        destination:
          'https://thuocsi.zendesk.com/hc/vi/articles/360029452652-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%B7t-h%C3%A0ng',
        permanent: false,
      },
      {
        source: '/faq',
        destination:
          'https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-',
        permanent: false,
      },
      {
        source: '/career',
        destination: 'https://career.thuocsi.vn/',
        permanent: false,
      },
      {
        source: '/register-with-us',
        destination: process.env.NEXT_PUBLIC_DOMAIN_SELLER_CENTER,
        permanent: false,
      },
    ];
  },
  pageExtensions: ['js'],
};
