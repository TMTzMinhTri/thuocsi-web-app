import { encodeUrl } from 'utils/StringUtils';
/* eslint-disable operator-linebreak */
// WEB
export const MY_ORDER_URL = '/my-order';
export const ABOUT_US_URL = '/about-us';
export const PRIVACY_POLICY_URL = '/privacy-policy';
export const GENERAL_POLICY_URL = '/general-policy';
export const CONDITIONS_OF_USE_URL = '/conditions-of-use';
export const DISPUTE_RESOLUTION_URL = '/dispute-resolution';
export const TERMS_URL = '/terms-and-condition';
export const REGULATIONS_URL = '/regulations';
export const QUICK_ORDER = '/quick-order';
export const PRODUCT = '/product';
export const NOT_FOUND_URL = '/404';

export const getPathProductBySlug = (slug) => `${PRODUCT}/${encodeUrl(slug)}`;

// SUB DOMAIN
export const PATH_NEWS = 'https://news.thuocsi.vn';
export const PATH_CAREER = 'https://career.thuocsi.vn';
export const PATH_SUPPLIER = 'https://supplier.thuocsi.vn';
export const CAREER = 'https://career.thuocsi.vn/';

// OUTBOUND

export const PATH_INFO_BILL =
  'https://thuocsi.zendesk.com/hc/vi/articles/360029453432-Xu%E1%BA%A5t-h%C3%B3a-%C4%91%C6%A1n-%C4%91%E1%BB%8F-t%E1%BA%A1i-thuocsi-vn-';
export const QNA =
  'https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-';
export const ORDER_GUIDE =
  'https://thuocsi.zendesk.com/hc/vi/articles/360029452652-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%B7t-h%C3%A0ng';
export const LICENSE_PDF =
  'https://buymed-storage.s3-ap-southeast-1.amazonaws.com/trading_license/1.+Trading+License+-+Buymed+(GC+20+June+2019)+(VN).pdf';
export const LEGAL_IMAGE =
  'https://assets.thuocsi.vn/assets/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png';
export const FEEDBACK = 'https://cs.stg.thuocsi.vn/feedback';

export const WEB = {};
