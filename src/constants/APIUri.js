const ACCOUNT_API_PREFIX = '/core/account/v1';
const CUSTOMER_API_PREFIX = '/customer/customer/v1';

const AUTHENTICATION = `${ACCOUNT_API_PREFIX}/authentication`;
export const ACCOUNT_API = {
  AUTHENTICATION,
};

const REGISTER = `${CUSTOMER_API_PREFIX}/register`;
const INFO = `${CUSTOMER_API_PREFIX}/me`;

export const CUSTOMER_API = {
  REGISTER,
  INFO,
};
