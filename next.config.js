if (process.env.NODE_ENV === 'PRODUCTION' || process.env.ENV === 'prd') {
  console.log = function () {};
  console.debug = function () {};
  console.warn = function () {};
  console.info = function () {};
}

module.exports = {
  images: {
    domains: [
      'assets.thuocsi.vn',
      'storage.googleapis.com',
      'www.facebook.com',
      'img-proxy.v2-dev.thuocsi.vn',
      'img-proxy.thuocsi.vn',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [50, 100, 200],
  },
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=1080',
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value: 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=1800',
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ];
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
