import {
  ThumbUp,
  Receipt,
  FlashOn,
  Stop,
  PriorityHigh,
  HighlightOff,
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons';

import styles from './style.module.css';

const TagTypeProps = {
  default: {
    border: '1px solid #000',
    color: '#000',
  },
  BAN_CHAY: {
    text: 'Bán chạy',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <ThumbUp className={styles.icon} />,
  },

  HOA_DON_NHANH: {
    text: 'Hóa đơn nhanh',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <Receipt className={styles.icon} />,
  },

  CLOSE_TO_EXPIRED_DATE: {
    text: 'Cận date',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <Receipt className={styles.icon} />,
  },
  PROMOTION: {
    text: 'Khuyến mãi',
    color: '#dc3545',
    border: '1px solid #dc3545',
  },
  'Hàng việt': {
    text: 'Hàng việt',
    backgroundColor: '#f8f9fa',
    color: '#00b46e',
  },

  FLASH_SALE: {
    text: 'Flash Sale',
    border: '1px solid #f9b514',
    color: '#f9b514',
    icon: <FlashOn className={styles.icon} />,
  },

  OUT_OF_STOCKS: {
    text: 'Tạm hết hàng',
    border: '1px solid #f9b514',
    color: '#f9b514',
    icon: <HighlightOff className={styles.icon} />,
  },

  DROP_SHIP: {
    text: 'Dropship',
    border: '1px solid #f9b514',
    color: '#f9b514',
  },

  GIAO_NHANH: {
    text: 'Giao nhanh',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <ThumbUp className={styles.icon} />,
  },

  CHANGE_STYLE: {
    text: 'Đổi mẫu',
    border: '1px solid #f9b514',
    color: '#f9b514',
    icon: <FlashOn className={styles.icon} />,
  },

  STOP_PRODUCING: {
    text: 'Ngừng sản xuất',
    border: '1px solid #f9b514',
    color: '#f9b514',
    icon: <Stop className={styles.icon} />,
  },

  ONLY_THUOCSI: {
    text: 'Chỉ có tại thuocsi',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <PriorityHigh className={styles.icon} />,
  },

  HARD_TO_BUY: {
    text: 'Khó mua',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <PriorityHigh className={styles.icon} />,
  },

  NEW: {
    text: 'Mới',
    border: '1px solid #212529',
    color: '#212529',
  },

  PRICE_DOWN: {
    text: 'Giảm Giá',
    border: '1px solid #00b46e',
    color: '#00b46e',
    icon: <ArrowDownward className={styles.icon} />,
  },

  PRICE_UP: {
    text: 'Tăng Giá',
    border: '1px solid #dc3545',
    color: '#dc3545',
    icon: <ArrowUpward className={styles.icon} />,
  },
};

export default TagTypeProps;
