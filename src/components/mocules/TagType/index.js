import React from 'react';
import { Tag } from 'components/atoms';
import {
  BEST_SELLER,
  INVOICE_EXPORTABLE,
  CLOSE_DATE,
  PROMOTE,
  USE_VIETNAMSE,
  FLASH_SALE,
  OUT_OF_STOCKS,
  DROP_SHIP,
  CHANGE_STYLE,
  STOP_PRODUCING,
  NEW,
  PRICE_DOWN,
  PRICE_UP,
  ONLY_THUOCSI,
  HARD_TO_BUY,
} from 'constants/TagType';

const TagType = ({ type, date }) => {
  switch (type) {
    case 'best_sale':
      return <Tag {...BEST_SELLER} />;
    case 'invoice_exportable':
      return <Tag {...INVOICE_EXPORTABLE} />;
    case 'close_date':
      return <Tag date={date} {...CLOSE_DATE} />;
    case 'promote':
      return <Tag {...PROMOTE} />;
    case 'use_vietnamse':
      return <Tag {...USE_VIETNAMSE} />;
    case 'flash_sale':
      return <Tag {...FLASH_SALE} />;
    case 'out_of_stocks':
      return <Tag {...OUT_OF_STOCKS} />;
    case 'drop_ship':
      return <Tag {...DROP_SHIP} />;
    case 'change_style':
      return <Tag {...CHANGE_STYLE} />;
    case 'stop_producing':
      return <Tag {...STOP_PRODUCING} />;
    case 'only_thuocsi':
      return <Tag {...ONLY_THUOCSI} />;
    case 'hard_to_buy':
      return <Tag {...HARD_TO_BUY} />;
    case 'new':
      return <Tag {...NEW} />;
    case 'price_down':
      return <Tag {...PRICE_DOWN} />;
    case 'price_up':
      return <Tag {...PRICE_UP} />;
    default:
      return <Tag {...BEST_SELLER} />;
  }
};

export default TagType;
