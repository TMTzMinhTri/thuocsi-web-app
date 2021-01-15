import { getUserWithContext } from './AuthClient';

/*
  redirect = { url , notify}
*/
export const doWithServerSide = async (ctx, callback, redirect = null) => {
  try {
    const { user, isAuthenticated } = await getUserWithContext(ctx);
    if (!isAuthenticated && redirect) {
      const redirectUrl = redirect.url || '/';
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      };
    }

    let result = callback(ctx);
    // wait for page promise
    if (result && result instanceof Promise) {
      result = await result;
    }
    result = result || {};
    result.props = result.props || {};
    result.props.user = user || null;
    result.props.isAuthenticated = isAuthenticated;
    return result;
  } catch (err) {
    return {
      props: {
        isAuthenticated: false,
        user: null,
      },
    };
  }
};

export default {
  doWithServerSide,
};
