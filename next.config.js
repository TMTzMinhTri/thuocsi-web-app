if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.log = function () {};
  console.debug = function () {};
  console.warn = function () {};
  console.info = function () {};
}

module.exports = {
  async rewrites() {
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: 'http://api.v2-dev.thuocsi.vn',
      },
    ];
  },
};
