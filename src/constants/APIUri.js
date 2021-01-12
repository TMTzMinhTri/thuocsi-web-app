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
const PROMO = `${CUSTOMER_API_PREFIX}/promos`;

export const CUSTOMER_API = {
  REGISTER,
  INFO,
  WALLET,
  ORDER,
  REFERRAL,
  PROMO,
};

const CATEGORY_API_PREFIX = '/marketplace/category/v1';
const BRAND = `${CATEGORY_API_PREFIX}/brand`;
const GROUP = `${CATEGORY_API_PREFIX}/group`;
export const CATEGORY_API = {
  BRAND,
  GROUP,
};

const CONTENT_API_PREFIX = '/marketplace/content/v1';
const STATIC_CONTENT = `${CONTENT_API_PREFIX}/static`;
export const CONTENT_API = {
  STATIC_CONTENT,
};

const PRODUCT_API_PREFIX = '/marketplace/product/v1';
const INGREDIENT = `${PRODUCT_API_PREFIX}/ingredient`;
const INGREDIENT_LIST = `${INGREDIENT}/list`;

export const PRODUCT_API = {
  INGREDIENT,
  INGREDIENT_LIST,
};

const CORE_MASTER_DATA_PREFIX = '/core/master-data/v1';
const PROVINCE_LIST = `${CORE_MASTER_DATA_PREFIX}/province/list`;
const DISTRICT = `${CORE_MASTER_DATA_PREFIX}/district`;
// administrative/list
const ADMINISTRATIVE = `${CORE_MASTER_DATA_PREFIX}/administrative/list`;
export const CORE_API = {
  PROVINCE_LIST,
  DISTRICT,
  ADMINISTRATIVE,
};
