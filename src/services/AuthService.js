import { AuthClient, isValid } from 'clients';

export const loginLocal = async (body) => {
  await AuthClient.loginLocal(body);
  return {};
};

export const login = async ({ username, password, type = 'CUSTOMER' }) => {
  const authRes = await AuthClient.login({ username, password, type });
  if (!isValid(authRes)) {
    return authRes;
  }
  return authRes;
};

export const signUp = async (data) => {
  const signUpRes = await AuthClient.signUp(data);
  return signUpRes;
};

export const registerGuest = async (data) => {
  const registerGuestRes = await AuthClient.registerGuest(data);
  return registerGuestRes;
};

export default { login, signUp, registerGuest, loginLocal };
