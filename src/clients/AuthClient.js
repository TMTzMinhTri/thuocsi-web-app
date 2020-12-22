import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST, getSessionToken, isValid } from './Clients';

export async function getUserWithContext(ctx) {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { loggedIn: false };
  }
  const result = await GET({ url: CUSTOMER_API.INFO, ctx });
  if (!isValid(result)) {
    return { loggedIn: false };
  }
  return { loggedIn: true, user: result.data[0] };
}

export async function doWithLoggedInUser(ctx, callback) {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { props: { loggedIn: false } };
  }
  let result = callback(ctx);
  // wait for page promise
  if (result && result instanceof Promise) {
    result = await result;
  }
  // set loggedIn = true if is is undefined
  result = result || {};
  result.props = result.props || {};
  if (typeof result.props.loggedIn === 'undefined') {
    result.props.loggedIn = true;
  }
  return result;
}

export async function login(body) {
  const result = await POST({
    url: ACCOUNT_API.AUTHENTICATION,
    body: { ...body, type: 'CUSTOMER' },
  });
  return result;
}

export async function signUp(body) {
  const result = await POST({ url: CUSTOMER_API.REGISTER, body });
  return result;
}

export async function getUser() {
  const result = await GET({ url: CUSTOMER_API.INFO, mock: true });
  return result;
}

export default { login, getUser, signUp, doWithLoggedInUser, getUserWithContext };
