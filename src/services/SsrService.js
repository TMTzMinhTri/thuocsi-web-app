import { getFirst, isValid } from 'clients';
import { getAccount } from './UserService';

export const doWithServerSide = async (ctx, callback, redirect = null) => {
  try {
    let isAuthenticated = false;
    let user = null;
    // const sessionToken = getSessionToken(ctx);
    const accRes = await getAccount(ctx);

    if (isValid(accRes)) {
      isAuthenticated = true;
      user = getFirst(accRes);
    }
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
    // result.props.sessionToken = sessionToken;
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
