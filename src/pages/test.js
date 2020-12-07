import React from 'react';
import { PlusButton, MinusButton, RibbonPriceDown, RibbonPriceUp } from 'components/atoms';
import { TagType } from 'components/mocules';
import { ProductCard } from 'components/organisms';
import getFormattedDate from 'utils/DateTimeUtils';
import ProductClient from 'clients/ProductClient';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './style.module.css';

export async function getServerSideProps() {
  const [products] = await Promise.all([ProductClient.loadDataProduct()]);

  return {
    props: {
      products,
    },
  };
}

const date = getFormattedDate(new Date());

const test = ({ products }) => (
  <>
    {products.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))}
    <RibbonPriceUp />
    <RibbonPriceDown />
    <PlusButton />
    <MinusButton />
    <LinearProgress
      classes={{
        root: styles.root_process,
        bar: {
          borderRadius: 5,
          backgroundColor: 'red',
        },
        barColorPrimary: styles.bar_background,
        colorPrimary: styles.blur_background,
      }}
      variant="determinate"
      value={50}
    />

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
