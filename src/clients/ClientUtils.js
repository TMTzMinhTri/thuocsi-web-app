// import { NotifyUtils } from 'utils';
import { getUserWithContext } from './AuthClient';

/*
redirect = { url , notify}
*/
export const doWithServerSide = async (ctx, callback, redirect = null) => {
  try {
    const { user, isAuthenticated } = await getUserWithContext(ctx);
    if (!isAuthenticated && redirect) {
      // notify ?
      // if (redirect.message && redirect.messa) {
      //   await NotifyUtils.error(redirect.message);
      // }
      const redirectUrl = redirect.url || '/';
      return {
        redirect: {
          destination: redirectUrl,
          permanent: true,
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
