import React from 'react';
import { Tag } from 'components/atoms';
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

const TagType = ({ type, date }) => {
  switch (type) {
    case 'best_sale':
      return (
        <Tag
          text="Bán chạy"
          backgroundColor="#00b46e"
          color="#fff"
          icon={<ThumbUp style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'invoice_exportable':
      return (
        <Tag
          text="Hóa đơn nhanh"
          backgroundColor="#f8f9fa"
          color="#00b46e"
          icon={<Receipt style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'close_date':
      return (
        <Tag
          text={`"Cận date:" ${date}`}
          backgroundColor="#f8f9fa"
          color="#f9b514"
          icon={<Receipt style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'promote':
      return <Tag text="Khuyến mãi" backgroundColor="#dc3545" color="#fff" />;
    case 'use_vietnamse':
      return <Tag text="Người Việt dùng hàng Việt" color="#00b46e" backgroundColor="#f8f9fa" />;
    case 'flash_sale':
      return (
        <Tag
          text="Flash Sale"
          backgroundColor="#f8f9fa"
          color="#f9b514"
          icon={<FlashOn style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'out_of_stocks':
      return (
        <Tag
          text="Tạm hết hàng"
          backgroundColor="#f8f9fa"
          color="#f9b514"
          icon={<HighlightOff style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'drop_ship':
      return <Tag text="Dropship" backgroundColor="#f8f9fa" color="#f9b514" />;
    case 'change_style':
      return (
        <Tag
          text="Đổi mẫu"
          backgroundColor="#f8f9fa"
          color="#f9b514"
          icon={<FlashOn style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'stop_producing':
      return (
        <Tag
          text="Ngừng sản xuất"
          backgroundColor="#f8f9fa"
          color="#f9b514"
          icon={<Stop style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'only_thuocsi':
      return (
        <Tag
          text="Chỉ có tại thuocsi"
          backgroundColor="#f8f9fa"
          color="#00b46e"
          icon={<PriorityHigh style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'hard_to_buy':
      return (
        <Tag
          text="Khó mua"
          backgroundColor="#f8f9fa"
          color="#00b46e"
          icon={<PriorityHigh style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'new':
      return <Tag text="Mới" backgroundColor="#f9b514" color="#212529" />;
    case 'price_down':
      return (
        <Tag
          text="Giảm Giá"
          backgroundColor="#f8f9fa"
          color="#00b46e"
          icon={<ArrowDownward style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    case 'price_up':
      return (
        <Tag
          text="Tăng Giá"
          backgroundColor="#f8f9fa"
          color="#dc3545"
          icon={<ArrowUpward style={{ fontSize: 13, marginRight: '0.25rem!important' }} />}
        />
      );
    default:
      return <Tag text="Khuyến mãi" color="#dc3545" />;
  }
};

export default TagType;
