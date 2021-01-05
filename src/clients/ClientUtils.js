import { getUserWithContext } from './AuthClient';

export const doWithServerSide = async (ctx, callback) => {
  try {
    const { user, isAuthenticated } = await getUserWithContext(ctx);

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
