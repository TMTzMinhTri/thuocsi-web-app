const ACCOUNT_API_PREFIX = '/core/account/v1';
const CUSTOMER_API_PREFIX = '/marketplace/customer/v1';

const AUTHENTICATION = `${ACCOUNT_API_PREFIX}/authentication`;
export const ACCOUNT_API = {
  AUTHENTICATION,
};

const REGISTER = `${CUSTOMER_API_PREFIX}/register`;
const INFO = `${CUSTOMER_API_PREFIX}/me`;
const WALLET = `${CUSTOMER_API_PREFIX}/wallets`;
const ORDER = `${CUSTOMER_API_PREFIX}/orders`;
const REFERRAL = `${CUSTOMER_API_PREFIX}/referrals`;

export const CUSTOMER_API = {
  REGISTER,
  INFO,
  WALLET,
  ORDER,
  REFERRAL,
};
