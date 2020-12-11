import { GET, POST } from './Clients';

export async function login(body) {
  const result = await POST({ url: '/core/account/v1/authentication', body });
  return result;
}

export async function signUp(body) {
  //   {
  //     "name": "customer 1235",
  //     "phone": "123123135312",
  //     "email": "1231123s35@m.vn",
  //     "scope": "PHARMACY",
  //     "referCode": "asdasdasdasda",
  //     "password": "password"
  // }
  const result = await POST({ url: '/customer/customer/v1/register', body: JSON.stringify(body) });
  return result;
}

export async function getUser() {
  const result = await GET({ url: '/customer/customer/v1/me' });
  return result;
}

export default { login, getUser, signUp };
