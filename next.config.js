if (process.env.NODE_ENV === 'PRODUCTION' || process.env.ENV === 'prd') {
  console.log = function () {};
  console.debug = function () {};
  console.warn = function () {};
  console.info = function () {};
}

function getFormattedDate(date, format = 'DD/MM/YYYY') {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return format
    .replace('DD', String(day).padStart(2, '0'))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('YYYY', year)
    .replace('HH', String(hour).padStart(2, '0'))
    .replace('mm', String(minute).padStart(2, '0'))
    .replace('ss', String(second).padStart(2, '0'));
}

const generateBuildId = () => getFormattedDate(new Date(), 'YYYYMMDDHHmm');

module.exports = {
  publicRuntimeConfig: {
    buildId: generateBuildId(),
  },
  images: {
    domains: [
      'assets.thuocsi.vn',
      'storage.googleapis.com',
      'www.facebook.com',
      'img-proxy.v2-dev.thuocsi.vn',
      'img-proxy.thuocsi.vn',
    ],
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
