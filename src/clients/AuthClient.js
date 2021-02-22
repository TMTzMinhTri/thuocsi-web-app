import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST, getSessionToken } from './Clients';

export async function getUserWithContext(ctx) {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { isAuthenticated: false };
  }
  const result = await GET({ url: CUSTOMER_API.INFO, ctx });
  return result;
}

export async function login(body) {
  const result = await POST({
    url: ACCOUNT_API.AUTHENTICATION,
    body: { ...body, type: 'CUSTOMER' },
    isAuth: false,
  });
  return result;
}

// {username password }
export async function signUp(body) {
  const result = await POST({ url: CUSTOMER_API.REGISTER, body, isAuth: false });
  return result;
}

export async function getUser() {
  const result = await GET({ url: CUSTOMER_API.INFO });
  return result;
}

export default { login, getUser, signUp, getUserWithContext };
