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

const CATEGORY_API_PREFIX = '/marketplace/product/v1';
const BRAND = `${CATEGORY_API_PREFIX}/manufacturers/list`;
const GROUP = `${CATEGORY_API_PREFIX}/category/list`;
const CATEGORY_INFO = `${CATEGORY_API_PREFIX}/categories/info`;
const MANUFACTURER_INFO = `${CATEGORY_API_PREFIX}/manufacturers/info`;
export const CATEGORY_API = {
  BRAND,
  GROUP,
  CATEGORY_INFO,
  MANUFACTURER_INFO,
};

const CONTENT_API_PREFIX = '/marketplace/content/v1';
const STATIC_CONTENT = `${CONTENT_API_PREFIX}/static`;
export const CONTENT_API = {
  STATIC_CONTENT,
};

const PRODUCT_API_PREFIX = '/marketplace/product/v1';
const INGREDIENT = `${PRODUCT_API_PREFIX}/ingredient`;
const INGREDIENT_LIST = `${INGREDIENT}/list`;
const MANUFACTURER = `${PRODUCT_API_PREFIX}/manufacturers`;
const MANUFACTURER_LIST = `${MANUFACTURER}/list`;
const PRODUCT_LIST = `${PRODUCT_API_PREFIX}/products/list`;
const PRODUCT_LIST_COLLECTION = `${PRODUCT_API_PREFIX}/collection/page`;
const TAGS = `${PRODUCT_API_PREFIX}/tags/list`;

export const PRODUCT_API = {
  INGREDIENT,
  MANUFACTURER,
  INGREDIENT_LIST,
  MANUFACTURER_LIST,
  PRODUCT_LIST,
  PRODUCT_LIST_COLLECTION,
  TAGS,
};

const CORE_MASTER_DATA_PREFIX = '/core/master-data/v1';
const PROVINCE_LIST = `${CORE_MASTER_DATA_PREFIX}/provinces/list`;
const DISTRICT = `${CORE_MASTER_DATA_PREFIX}/districts`;
// administrative/list
const ADMINISTRATIVE = `${CORE_MASTER_DATA_PREFIX}/administratives/list`;
export const CORE_API = {
  PROVINCE_LIST,
  DISTRICT,
  ADMINISTRATIVE,
};

const CART_API_PREFIX = '/marketplace/order/v1';
const CART_INFO = `${CART_API_PREFIX}/cart`;
const CART_ADD = `${CART_API_PREFIX}/cart/add`;
const CART_REMOVE = `${CART_API_PREFIX}/cart/remove`;

export const CART_API = {
  CART_INFO,
  CART_ADD,
  CART_REMOVE,
};

// promotion
// /marketplace/promotion/v1/promotion
const PROMOTION_API_PREFIX = '/marketplace/promotion/v1';
const PROMOTION_ALL = `${PROMOTION_API_PREFIX}/promotion`;

export const PROMOTION_API = {
  PROMOTION_ALL,
};

const ORDER_API_PREFIX = '/marketplace/order/v1';
export const ORDER_ITEM_LIST = `${ORDER_API_PREFIX}/me/order-item`;

export const ORDER_API = {
  ORDER_ITEM_LIST,
  ORDER_API_PREFIX,
};
