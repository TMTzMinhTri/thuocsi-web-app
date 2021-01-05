/* eslint-disable camelcase */

import React from 'react';
// import { Grid, Box } from '@material-ui/core';
import { PlusButton, MinusButton, RibbonPriceDown, RibbonPriceUp } from 'components';
import { TagType, CardInfo } from 'components/mocules';
// import { BestSaleProduct, ProductCardHorizontal } from 'components/organisms';
// import {DateTimeUtils} from 'utils';
// import { ProductClient, doWithServerSide, AuthClient } from 'clients';
// import { useRouter } from 'next/router';
// import CatClient from 'clients/CatClient';

// export async function getServerSideProps(ctx) {
//   const [products] = await Promise.all([ProductClient.loadDataProduct(ctx)]);
//   return {
//     props: {
//       products,
//     },
//   };
// }
// export async function getServerSideProps(ctx) {
//   try {
//     return doWithServerSide(ctx, async () => {
//       const [products, brand, group] = await Promise.all([
//         ProductClient.loadDataProduct(ctx),
//         CatClient.loadBrand(ctx),
//         CatClient.loadGroup(ctx),
//       ]);
//       return {
//         props: {
//           products,
//           brand,
//           group,

//         },
//       };
//     });
//   } catch (error) {
//     window.location.href = '/';

//     return {
//       props: {
//         user: {
//           name: '',
//           phone: '',
//           email: '',
//         },
//         wallet: {
//           balance: 0,
//           name: '',
//         },
//       },
//     };
//   }
// }
// const date = DateTimeUtils.getFormattedDate(new Date());

const Test = () => (
  //   {
  //   products = [],
  //  brand = [],
  //   group = [],
  //  current_tab = '',
  //   page = '',
  //   sort = '',
  //   slug = '', user = []
  // }

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     minHeight: '100vh',
  //     padding: theme.spacing(4),
  //   },
  // }));

  // const [value, setValue] = useState({
  //   name: user.name,
  //   phone: user.phone,
  //   email: user.email,
  //   password: '',
  //   drugstoreName: '',
  //   bussinessName: '',
  //   billProvince: 0,
  //   billDistrict: 0,
  //   billWard: 0,
  //   taxId: '',
  //   bussinessAddress: '',
  //   province: 0,
  //   district: 0,
  //   ward: 0,
  // });
  // console.log(value);
  // // const classes = useStyles();
  // const handleSetValue = (key, val) => {
  //   setValue({ ...value, [key]: val });
  // };
  <>
    {/* <Box maxWidth="1140px" m="auto">
        <Grid spacing={4} container>
          <Grid item xs={12} md={8}>
            <DeliveryInfoForm {...value} handleSetValue={handleSetValue} />
            <DeliveryMethod />
            <PaymentMethod />
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSticky />
          </Grid>
        </Grid>

      </Box> */}
    {/* <Box maxWidth="1140px" m="auto">
        <PromotionProduct
          products={products}
          brand={brand.status === 'OK' ? brand.data : []}
          group={group.status === 'OK' ? group.data : []}
          current_tab={current_tab}
          page={page}
          sort={sort}
          catName="products"
          slug={slug}
        />
      </Box> */}
    {/* <BestSaleProduct products={products} />
    {products.map((item) => (
      <ProductCardHorizontal key={item.id} product={item} />
    ))} */}

    {/* {products.map((item) => (

        <Grid classes={{ root: classes.root }} container alignItems="center" justify="center">
          <MultiImageBox loading={false} imageType="main" images={item.imageUrls} />
        </Grid>
      ))} */}

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
    {/* <TagType date={date} type="CLOSE_TO_EXPIRED_DATE" /> */}
  </>
);
export default Test;
