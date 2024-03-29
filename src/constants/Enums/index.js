import {
  MoreHoriz as MoreHorizIcon,
  // Cancel as CancelIcon,
  // Done as DoneIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Assignment as AssignmentIcon,
  AssignmentReturned as AssignmentReturnedIcon,
  AssignmentLate as AssignmentLateIcon,
} from '@material-ui/icons';

export const ENUM_SCOPE = {
  DRUGSTORE: 'DRUGSTORE',
  PHARMACY: 'PHARMACY',
  CLINIC: 'CLINIC',
};

export const PAYMENT_METHOD = {
  COD: 'PAYMENT_METHOD_NORMAL',
  TRANSFER: 'PAYMENT_METHOD_BANK',
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
  ABSOLUTE: 'ABSOLUTE',
};

export const PROMO_REWARD_TYPE = {
  PERCENTAGE: 'PERCENTAGE',
  GIFT: 'GIFT',
  POINT: 'POINT',
  ABSOLUTE: 'ABSOLUTE',
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

export const ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
};

export const LIST_REASONS = [
  {
    code: 'SAI_SAN_PHAM',
    name: 'Sai sản phẩm',
  },
  {
    code: 'DONG_THIEU_HANG',
    name: 'Đóng thiếu hàng',
  },
  {
    code: 'DONG_DU_HANG',
    name: 'Đóng dư hàng',
  },
  {
    code: 'CAN_NGAY',
    name: 'Cận ngày',
  },
  {
    code: 'SAN_PHAM_HU_BE',
    name: 'Sản phẩm hư bể',
  },
  {
    code: 'CHENH_LECH_CHUYEN_KHOAN',
    name: 'Chênh lệch chuyển khoản',
  },
  {
    code: 'KHACH_DAT_SAI',
    name: 'Khách đặt sai',
  },
  {
    code: 'MAT_HANG',
    name: 'Mất hàng',
  },
  {
    code: 'SAI_HOA_DON',
    name: 'Sai hóa đơn',
  },
  {
    code: 'GIAO_LON_THUNG_HANG',
    name: 'Giao lộn thùng hàng',
  },
  {
    code: 'GIAO_HANG_TRE',
    name: 'Giao hàng trễ',
  },
  {
    code: 'HUY_DON',
    name: 'Hủy đơn',
  },
  {
    code: 'TRA_HANG_VE',
    name: 'Trả hàng về',
  },
  {
    code: 'CHAT_LUONG_SAN_PHAM',
    name: 'Chất lượng sản phẩm',
  },
  {
    code: 'DONG_SAI_SO_LUONG',
    name: 'Đóng sai số lượng',
  },
  {
    code: 'HEN_GIAO_HANG',
    name: 'Hẹn giao hàng',
  },
  {
    code: 'HOA_DON_DO',
    name: 'Hóa đơn đỏ',
  },
  {
    code: 'HOI_GIAO_HANG',
    name: 'Hối giao hàng',
  },
  {
    code: 'KHACH_TU_Y_HUY_DON',
    name: 'Khách tự ý hủy đơn',
  },
  {
    code: 'KHONG_LIEN_LAC_DUOC_KHACH',
    name: 'Không liên lạc được khách',
  },
  {
    code: 'SAI_DIA_CHI',
    name: 'Sai địa chỉ',
  },
  {
    code: 'THAY_DOI_DIA_CHI',
    name: 'Thay đổi địa chỉ',
  },
  {
    code: 'THAY_DOI_HINH_THUC_THANH_TOAN',
    name: 'Thay đổi hình thức thanh toán',
  },
  {
    code: 'THAY_DOI_SO_LUONG',
    name: 'Thay đổi số lượng',
  },
  {
    code: 'TINH_TRANG_DON_HANG',
    name: 'Tình trạng đơn hàng',
  },
  {
    code: 'GHI_CHU_DON_HANG',
    name: 'Ghi chú đơn hàng',
  },
  {
    code: 'THAC_MAC_SAN_PHAM',
    name: 'Thắc mắc sản phẩm',
  },
  {
    code: 'THAC_MAC_DICH_VU',
    name: 'Thắc mắc dịch vụ',
  },
  {
    code: 'THAC_MAC_THANH_TOAN',
    name: 'Thắc mắc thanh toán',
  },
  {
    code: 'LOI_KI_THUAT',
    name: 'Lỗi kĩ thuật',
  },
  {
    code: 'VAN_DE_KHAC',
    name: 'Vấn đề khác',
  },
];

export const LIST_REASONS_MAP = LIST_REASONS.reduce((map, item) => {
  // eslint-disable-next-line no-param-reassign
  map[item.code] = item;
  return map;
}, {});

export const FEEDBACK_REASON = LIST_REASONS_MAP;
// {
//   DONG_THIEU_HANG: {
//     code: 'DONG_THIEU_HANG',
//     name: 'Đóng thiếu hàng',
//   },
//   DONG_DU_HANG: {
//     code: 'DONG_DU_HANG',
//     name: 'Đóng dư hàng',
//   },
// };

export const ENUM_ORDER_STATUS = {
  ALL: 'ALL',
  WAIT_TO_CONFIRM: 'WAIT_TO_CONFIRM',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  DELIVERING: 'DELIVERING',
  CANCEL: 'CANCEL',
  COMPLETED: 'COMPLETED',
};

export const ENUM_ORDER_STATUS_LABEL = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 'Chờ xác nhận',
  [ENUM_ORDER_STATUS.CONFIRMED]: 'Đã xác nhận',
  [ENUM_ORDER_STATUS.PROCESSING]: 'Đang xử lý',
  [ENUM_ORDER_STATUS.DELIVERING]: 'Đang vận chuyển',
  [ENUM_ORDER_STATUS.CANCEL]: 'Đã hủy',
  [ENUM_ORDER_STATUS.COMPLETED]: 'Đã hoàn tất',
};

export const ENUM_ORDER_STATUS_COLOR = {
  [ENUM_ORDER_STATUS.WAIT_TO_CONFIRM]: 'btn--default',
  [ENUM_ORDER_STATUS.CONFIRMED]: 'btn--default',
  [ENUM_ORDER_STATUS.PROCESSING]: 'btn--default',
  [ENUM_ORDER_STATUS.DELIVERING]: 'btn--delivery',
  [ENUM_ORDER_STATUS.CANCEL]: 'btn--cancel',
  [ENUM_ORDER_STATUS.COMPLETED]: 'btn--complete',
};

export const ENUM_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  COMBO: 'COMBO',
  DEAL: 'DEAL',
};

export const TICKET_STATUS = [
  {
    value: 'PENDING',
    label: 'Chưa xử lý',
    color: '#cc5555',
    iconColor: '#cc5555',
    icon: <MoreHorizIcon />,
  },
  {
    value: 'ASSIGNED',
    label: 'Đã tiếp nhận',
    color: '#000',
    iconColor: '#55cccc',
    icon: <AssignmentIcon />,
  },
  {
    value: 'IN_PROCESS',
    label: 'Đang xử lý',
    color: '#0081CF',
    iconColor: '#55cccc',
    icon: <AssignmentReturnedIcon />,
  },
  {
    value: 'DONE',
    label: 'Đã xử lý',
    color: '#5b5',
    iconColor: '#5b5',
    icon: <AssignmentTurnedInIcon />,
  },
  {
    value: 'CANCELLED',
    label: 'Đã huỷ',
    color: '#bbb',
    iconColor: '#bbb',
    icon: <AssignmentLateIcon />,
  },
];

export default {
  ENUM_SCOPE,
  ENUM_TYPE,
  HTTP_STATUS,
  ENUM_ORDER_TYPE,
};
