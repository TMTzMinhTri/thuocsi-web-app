const CookiesParser = (cookies) =>
  cookies.split(';').reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent);
    try {
      return Object.assign(res, { [key]: JSON.parse(val) });
    } catch (error) {
      return Object.assign(res, { [key]: val });
    }
  }, {});

const getCookieFromCtx = (ctx, nameCookie) => {
  const cookies = ctx?.req?.headers?.cookie || null;
  if (!cookies || cookies == null) {
    return null;
  }
  const CookiesCtx = CookiesParser(cookies);
  return CookiesCtx[nameCookie];
};

export default { getCookieFromCtx, CookiesParser };
