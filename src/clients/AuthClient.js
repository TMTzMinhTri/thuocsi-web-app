import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST, PUT, getSessionToken } from './Clients';

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
export const passwordRecovery = async (body) => POST({ url: ACCOUNT_API.PASSWORD_RECOVERY, body, isBasic: true });
export const passwordUpdate = async (body) => PUT({ url: ACCOUNT_API.PASSWORD_RECOVERY, body, isBasic: true });

export const loginLocal = async (body) =>
  POST({ url: '/login', body, page: true, mock: true, isAuth: false });

// {username password }
export const signUp = async (body) => POST({ url: CUSTOMER_API.REGISTER, body, isAuth: false });

export const registerGuest = async (body) =>
  POST({ url: CUSTOMER_API.REGISTER_GUEST, body, isBasic: true });

export const getAccountInfo = async ({ ctx }) => GET({ url: ACCOUNT_API.GET_ACCOUNT_INFO, ctx });

export const getUser = async () => {
  const result = await GET({ url: CUSTOMER_API.INFO });
  return result;
};

export default {
  login,
  getUser,
  signUp,
  registerGuest,
  getUserWithContext,
  loginLocal,
  getAccountInfo,
  passwordRecovery,
  passwordUpdate
};
