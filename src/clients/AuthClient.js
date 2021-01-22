import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST, getSessionToken, isValid } from './Clients';

export async function getUserWithContext(ctx) {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { isAuthenticated: false };
  }
  const result = await GET({ url: CUSTOMER_API.INFO, ctx });
  if (!isValid(result)) {
    return { isAuthenticated: false };
  }
  const userInfo = result.data[0];

  return {
    isAuthenticated: true,
    user: { isActive: userInfo && userInfo.status === 'ACTIVE', ...userInfo },
  };
}

export async function login(body) {
  const result = await POST({
    url: ACCOUNT_API.AUTHENTICATION,
    body: { ...body, type: 'CUSTOMER' },
  });
  return result;
}

// {username password }
export async function signUp(body) {
  const result = await POST({ url: CUSTOMER_API.REGISTER, body });
  return result;
}

export async function getUser() {
  const result = await GET({ url: CUSTOMER_API.INFO });
  return result;
}

export default { login, getUser, signUp, getUserWithContext };
