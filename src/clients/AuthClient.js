import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST, getSessionToken } from './Clients';

export const getUserWithContext = async (ctx) => {
  const ss = getSessionToken(ctx);
  if (!ss) {
    return { isAuthenticated: false };
  }
  return GET({ url: CUSTOMER_API.INFO, ctx });
};

export const login = async (body) =>
  POST({
    url: ACCOUNT_API.AUTHENTICATION,
    body: { ...body, type: 'CUSTOMER' },
    isAuth: false,
  });

// {username password }
export const signUp = async (body) => POST({ url: CUSTOMER_API.REGISTER, body, isAuth: false });

export const getUser = async () => {
  const result = await GET({ url: CUSTOMER_API.INFO });
  return result;
};

export default { login, getUser, signUp, getUserWithContext };
