import React from 'react';
import { PlusButton, MinusButton, RibbonPriceDown, RibbonPriceUp } from 'components';
import TagType from 'components/mocules/TagType';
import getFormattedDate from 'utils/DateTimeUtils';

const date = getFormattedDate(new Date());

const test = () => (
  <>
    <RibbonPriceUp />
    <RibbonPriceDown />
    <PlusButton />
    <MinusButton />
    <TagType type="BEST_SELLER" />
    <TagType type="EXPORTABLE_INVOICE" />
    <TagType type="PROMOTION" />
    <TagType type="USE_VIETNAMSE_PRODUCT" />
    <TagType type="FLASH_SALE" />
    <TagType type="OUT_OF_STOCKS" />
    <TagType type="DROP_SHIP" />
    <TagType type="CHANGE_STYLE" />
    <TagType type="STOP_PRODUCING" />
    <TagType type="ONLY_THUOCSI" />
    <TagType type="HARD_TO_BUY" />
    <TagType type="NEW" />
    <TagType type="PRICE_DOWN" />
    <TagType type="PRICE_UP" />
    <TagType date={date} type="CLOSE_TO_EXPIRED_DATE" />
  </>
);

export default test;
