import { ACCOUNT_API, CUSTOMER_API } from 'constants/APIUri';
import { GET, POST } from './Clients';

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
  const result = await GET({ url: CUSTOMER_API.INFO });
  return result;
}

export default { login, getUser, signUp };
