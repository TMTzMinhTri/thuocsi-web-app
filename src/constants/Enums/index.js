export const ENUM_SCOPE = {
  DRUGSTORE: 'DRUGSTORE',
  PHARMACY: 'PHARMACY',
  CLINIC: 'CLINIC',
};

export const ENUM_ORDER_STATUS = {
  PENDING: 'WaitConfirm',
  ALL: 'all',
  COMPLETED: 'completed',
  CANCEL: 'Canceled',
  DELIVERY: 'delivery',
  CONFIRM: 'Confirmed',
};

export const PAYMENT_METHOD = {
  COD: 'COD',
  ChuyenKhoan: 'CK',
};

export const ENUM_TYPE = {};

export const RIBBON_STATUS = {
  UP: 'up',
  DOWN: 'down',
};

export const PROMO_TYPE = {
  DISCOUNT: 'DISCOUNT',
  COMBO: 'COMBO',
  GIFT: 'GIFT',
  VOUCHERCODE: 'VOUCHERCODE',
  FREESHIP: 'FREESHIP',
};

export const PROMOTION_STATUS = {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  FULL: 'FULL',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED',
};

export const PROMOTION_SCOPE = {
  GLOBAL: 'GLOBAL',
  SELLER: 'SELLER',
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  SKU: 'SKU',
};

export const PROMO_RULE_FIELD_TYPE = {
  MIN_QUANTITY: 'MIN_QUANTITY',
  MIN_ORDER_VALUE: 'MIN_ORDER_VALUE',
};

export const PROMO_RULE_TYPE = {
  VALUE: 'VALUE',
  PERCENT: 'PERCENT',
  GIFT: 'GIFT',
  PRODUCT: 'PRODUCT',
};

export const HTTP_STATUS = {
  Ok: 'OK',
  Error: 'ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Forbidden: 'FORBIDDEN',
  Existed: 'EXISTED',
  Unauthorized: 'UNAUTHORIZED',
};

export const PRODUCT_TYPE = {
  CAN_INVOICE: 'can invoice',
};

export const DEFAULT_PAGINATION = {
  OFFSET: 0,
  LIMIT: 20,
  TOTAL: 0,
};

export default {
  ENUM_SCOPE,
  ENUM_TYPE,
  HTTP_STATUS,
};
