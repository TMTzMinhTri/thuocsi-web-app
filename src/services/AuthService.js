import { AuthClient, isValid } from 'clients';

export const login = async ({ username, password }) => {
  const authRes = await AuthClient.login({ username, password });
  if (!isValid(authRes)) {
    return authRes;
  }
  return authRes;
};

export const signUp = async (data) => {
  const signUpRes = await AuthClient.signUp(data);
  return signUpRes;
};

export default { login, signUp };
