import React from 'react';
import { PlusButton, MinusButton, RibbonPriceDown, RibbonPriceUp } from 'components/atoms';
import { TagType, CardInfo } from 'components/mocules';
import { BestSaleProduct } from 'components/organisms';
import getFormattedDate from 'utils/DateTimeUtils';
import ProductClient from 'clients/ProductClient';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataProduct(ctx)]);
  return {
    props: {
      products,
    },
  };
}

const date = getFormattedDate(new Date());

const test = ({ products }) => (
  <>
    <BestSaleProduct products={products} />
    {/* <ProductCartList products={products} /> */}
    {/* {products.map((item) => (
      <ProductCart key={item.id} product={item} type="column" />
    ))} */}
    {/* {products.map((item) => (
      <ProductCardVertical key={item.id} product={item} type="column" />
    ))} */}
    {/* <>
      <Box
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 400,
          backgroundColor: '#fff',
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 12,
          paddingBottom: 12,
          boxShadow: '0px 3px 20px rgba(0,0,0,0.08)',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        <SearchInput />
      </Box>
      {products.map((item) => (
        <ProductCardHorizontal key={item.id} product={item} />
      ))}
    </> */}
    <RibbonPriceUp />
    <RibbonPriceDown />
    <PlusButton />
    <MinusButton />
    <CardInfo quantity={21231} total="3.000.000 đ" cart />
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
