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
};
