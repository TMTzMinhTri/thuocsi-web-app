const ACCOUNT_API_PREFIX = '/core/account/v1';

const AUTHENTICATION = `${ACCOUNT_API_PREFIX}/authentication`;
const GET_ACCOUNT_INFO = `${ACCOUNT_API_PREFIX}/me`;
const PASSWORD_RECOVERY = `${ACCOUNT_API_PREFIX}/password-recovery`;
export const ACCOUNT_API = {
  AUTHENTICATION,
  GET_ACCOUNT_INFO,
  PASSWORD_RECOVERY,
};

// MARKETPLACE

// PRICING
const PRICING_API_PREFIX = '/marketplace/pricing/v1';
const DELIVERY_METHOD = `${PRICING_API_PREFIX}/delivery-platform/list`;
const DELIVERY_METHOD_DETAIL = `${PRICING_API_PREFIX}/delivery-platform`;
const PAYMENT_METHOD = `${PRICING_API_PREFIX}/payment-method/list`;
const PAYMENT_METHOD_DETAIL = `${PRICING_API_PREFIX}/payment-method`;
export const PRICING_API = {
  PAYMENT_METHOD,
  DELIVERY_METHOD,
  PAYMENT_METHOD_DETAIL,
  DELIVERY_METHOD_DETAIL,
};

// CUSTOMER
const CUSTOMER_API_PREFIX = '/marketplace/customer/v1';

const REGISTER = `${CUSTOMER_API_PREFIX}/register`;
const REGISTER_GUEST = `${CUSTOMER_API_PREFIX}/guest`;
const INFO = `${CUSTOMER_API_PREFIX}/me`;
const WALLET = `${CUSTOMER_API_PREFIX}/wallets`;
const ORDER = `${CUSTOMER_API_PREFIX}/orders`;
const REFERRAL = `${CUSTOMER_API_PREFIX}/me/reference/list`;
const SEND_SMS = `${CUSTOMER_API_PREFIX}/me/reference`;
const RETRY_SEND_SMS = `${CUSTOMER_API_PREFIX}/me/reference/sms`;
const PROMO = `${CUSTOMER_API_PREFIX}/promos`;
const BANK_ACCOUNT = `${INFO}/account/bank`;

export const CUSTOMER_API = {
  REGISTER,
  INFO,
  WALLET,
  ORDER,
  REFERRAL,
  PROMO,
  SEND_SMS,
  RETRY_SEND_SMS,
  REGISTER_GUEST,
  BANK_ACCOUNT,
};

// PRODUCTS

const CONTENT_API_PREFIX = '/marketplace/content/v1';
const STATIC_CONTENT = `${CONTENT_API_PREFIX}/static`;
export const CONTENT_API = {
  STATIC_CONTENT,
};

const PRODUCT_API_PREFIX = '/marketplace/product/v1';

export const PRODUCT_API = {
  INGREDIENT: `${PRODUCT_API_PREFIX}/ingredients`,
  INGREDIENT_LIST: `${PRODUCT_API_PREFIX}/ingredients/list`,
  INGREDIENT_PRODUCT_LIST: `${PRODUCT_API_PREFIX}/ingredients/list`,
  MANUFACTURER: `${PRODUCT_API_PREFIX}/manufacturers`,
  MANUFACTURER_LIST: `${PRODUCT_API_PREFIX}/manufacturers/list`,
  MANUFACTURER_DETAIL: `${PRODUCT_API_PREFIX}/manufacturer`,
  MANUFACTURER_INFO: `${PRODUCT_API_PREFIX}/manufacturer/info`,
  PRODUCT_LIST: `${PRODUCT_API_PREFIX}/products/list`,
  PRODUCT_LIST_COLLECTION: `${PRODUCT_API_PREFIX}/collection/page`,
  TAGS: `${PRODUCT_API_PREFIX}/tags/list`,
  TABS_ACTIVE: `${PRODUCT_API_PREFIX}/tabs/active`,
  DEALS: `${PRODUCT_API_PREFIX}/products/deal/list`,
  CATEGORY_LIST: `${PRODUCT_API_PREFIX}/category/list`,
  CATEGORY_INFO: `${PRODUCT_API_PREFIX}/categories/info`,
};

const CORE_MASTER_DATA_PREFIX = '/core/master-data/v1';
const PROVINCE_LIST = `${CORE_MASTER_DATA_PREFIX}/provinces/list`;
const DISTRICT = `${CORE_MASTER_DATA_PREFIX}/districts`;
const ADMINISTRATIVE = `${CORE_MASTER_DATA_PREFIX}/administratives/list`;
export const CORE_API = {
  PROVINCE_LIST,
  DISTRICT,
  ADMINISTRATIVE,
};

const CART_API_PREFIX = '/marketplace/order/v1';
const CART_INFO = `${CART_API_PREFIX}/cart`;
const DELIVERY_METHOD_UPDATE = `${CART_INFO}/delivery-method`;
const PAYMENT_METHOD_UPDATE = `${CART_INFO}/payment-method`;
const CART_ADD = `${CART_API_PREFIX}/cart/add`;
const CART_REMOVE = `${CART_API_PREFIX}/cart/remove`;
const CART_UPDATE_REDEEM_CODE = `${CART_API_PREFIX}/cart/promotion`;

export const CART_API = {
  CART_INFO,
  CART_ADD,
  CART_REMOVE,
  CART_UPDATE_REDEEM_CODE,
  DELIVERY_METHOD_UPDATE,
  PAYMENT_METHOD_UPDATE,
};

const ORDER_API_PREFIX = '/marketplace/order/v1';
export const ORDER_ITEM_LIST = `${ORDER_API_PREFIX}/me/order-item`;
export const ORDER_INFO = `${ORDER_API_PREFIX}/me/order`;
export const MY_ORDER_LIST = `${ORDER_API_PREFIX}/me/orders`;

export const ORDER_API = {
  ORDER_ITEM_LIST,
  ORDER_INFO,
  MY_ORDER_LIST,
};

// promotion
// /marketplace/promotion/v1/promotion
const PROMOTION_API_PREFIX = '/marketplace/promotion/v1';
const PROMOTION_ALL = `${PROMOTION_API_PREFIX}/promotion`;
const PROMOTION_DETAI_VOUCHER_CODE = `${PROMOTION_API_PREFIX}/voucher`;

export const PROMOTION_API = {
  PROMOTION_ALL,
  PROMOTION_API_PREFIX,
  PROMOTION_DETAI_VOUCHER_CODE,
};

// Supplier API

const SUPPLIER_API_PREFIX = '/seller/core/v1';
const SUPPLIER_INFO = `${SUPPLIER_API_PREFIX}/seller/info`;

export const SUPPLIER_API = {
  SUPPLIER_INFO,
};

const NOTIFICATION_API_PREFIX = '/integration/notification/v1';
const NOTIFICATION_LIST = `${NOTIFICATION_API_PREFIX}/notification/me`;
const NOTIFICATION_COUNTER = `${NOTIFICATION_API_PREFIX}/notification/me/counter`;
const NOTIFICATION_WSS = `${NOTIFICATION_API_PREFIX}/web-socket`;
const NOTIFICATION = `${NOTIFICATION_API_PREFIX}/notification`;
const NOTIFICATION_ALL = `${NOTIFICATION_API_PREFIX}/notification/all`;

export const NOTIFICATION_API = {
  NOTIFICATION_COUNTER,
  NOTIFICATION_LIST,
  NOTIFICATION_WSS,
  NOTIFICATION_ALL,
  NOTIFICATION,
};

const SETTING_API_PREFIX = '/marketplace/marketing/v1';
const SETTING_LIST = `${SETTING_API_PREFIX}/settings/all`;

export const SETTING_API = {
  SETTING_LIST,
};

const MARKETING_API_PREFIX = '/marketplace/marketing/v1';
const BANNER = `${MARKETING_API_PREFIX}/banners/available`;

export const MARKETING_API = {
  BANNER,
};

const TICKET_API_PREFIX = '/marketplace/ticket/v1';
const TICKET = `${TICKET_API_PREFIX}/ticket/customer`;
const TICKET_REASONS = `${TICKET_API_PREFIX}/reasons/list`;
export const TICKET_API = {
  TICKET,
  TICKET_REASONS,
};
