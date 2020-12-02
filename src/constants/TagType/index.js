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

const date = null;

export const BEST_SELLER = {
  text: 'Bán chạy',
  backgroundColor: '#00b46e',
  color: '#fff',
  icon: <ThumbUp style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const INVOICE_EXPORTABLE = {
  text: 'Hóa đơn nhanh',
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
  icon: <Receipt style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const CLOSE_DATE = {
  text: `Cận date: ${date}`,
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
  icon: <Receipt style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const PROMOTE = {
  text: 'Khuyến mãi',
  backgroundColor: '#dc3545',
  color: '#fff',
};

export const USE_VIETNAMSE = {
  text: 'Người Việt dùng hàng Việt',
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
};

export const FLASH_SALE = {
  text: 'Flash Sale',
  backgroundColor: '#f8f9fa',
  color: '#f9b514',
  icon: <FlashOn style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const OUT_OF_STOCKS = {
  text: 'Tạm hết hàng',
  backgroundColor: '#f8f9fa',
  color: '#f9b514',
  icon: <HighlightOff style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const DROP_SHIP = {
  text: 'Dropship',
  backgroundColor: '#f8f9fa',
  color: '#f9b514',
};

export const CHANGE_STYLE = {
  text: 'Đổi mẫu',
  backgroundColor: '#f8f9fa',
  color: '#f9b514',
  icon: <FlashOn style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const STOP_PRODUCING = {
  text: 'Ngừng sản xuất',
  backgroundColor: '#f8f9fa',
  color: '#f9b514',
  icon: <Stop style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const ONLY_THUOCSI = {
  text: 'Chỉ có tại thuocsi',
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
  icon: <PriorityHigh style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const HARD_TO_BUY = {
  text: 'Khó mua"',
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
  icon: <PriorityHigh style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const NEW = {
  text: 'Mới',
  backgroundColor: '#f9b514',
  color: '#212529',
};

export const PRICE_DOWN = {
  text: 'Giảm Giá',
  backgroundColor: '#f8f9fa',
  color: '#00b46e',
  icon: <ArrowDownward style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};

export const PRICE_UP = {
  text: 'Tăng Giá',
  backgroundColor: '#f8f9fa',
  color: '#dc3545',
  icon: <ArrowUpward style={{ fontSize: 13, marginRight: '0.25rem!important' }} />,
};
