/* eslint-disable no-param-reassign */
const exports = (doc) => {
  if (!doc) {
    doc = {};
  }
  if (typeof doc === 'string') doc = { cookie: doc };
  if (doc.cookie === undefined) doc.cookie = '';

  const self = {};
  self.get = (key) => {
    const splat = doc.cookie.split(/;\s*/);
    for (let i = 0; i < splat.length; i += 1) {
      const ps = splat[i].split('=');
      const k = unescape(ps[0]);
      if (k === key) return unescape(ps[1]);
    }
    return undefined;
  };

  self.set = (key, value, opts) => {
    if (!opts) opts = {};
    let s = `${escape(key)}=${escape(value)}`;
    if (opts.expires) s += `; expires=${opts.expires}`;
    if (opts.path) s += `; path=${escape(opts.path)}`;
    if (opts.domain) s += `; domain=${escape(opts.domain)}`;
    if (opts.secure) s += '; secure';
    doc.cookie = s;
    return s;
  };
  return self;
};

module.exports = exports;

if (typeof document !== 'undefined') {
  const cookie = exports(document);
  exports.get = cookie.get;
  exports.set = cookie.set;
}
