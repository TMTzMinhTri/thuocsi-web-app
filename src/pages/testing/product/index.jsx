// /* eslint-disable camelcase */

// import React from 'react';
// // import { Grid, Box } from '@material-ui/core';
// // import { PlusButton, MinusButton, RibbonPriceDown, RibbonPriceUp } from 'components';
// // import { TagType, CardInfo } from 'components/mocules';
// import { ProductSliderSection } from 'components/organisms';
// // import {DateTimeUtils} from 'utils';
// import { ProductClient, doWithServerSide } from 'clients';
// // import { useRouter } from 'next/router';
// // import CatClient from 'clients/CatClient';

// export async function getServerSideProps(ctx) {
//   return doWithServerSide(ctx, async () => {
//     const isTotal = false;

//     return {
//       props: {
//         products,
//       },
//     };
//   });
// }
// // export async function getServerSideProps(ctx) {
// //   try {
// //     return doWithServerSide(ctx, async () => {
// //       const [products, brand, group] = await Promise.all([
// //         ProductClient.loadDataProduct(ctx),
// //         CatClient.loadBrand(ctx),
// //         CatClient.loadGroup(ctx),
// //       ]);
// //       return {
// //         props: {
// //           products,
// //           brand,
// //           group,

// //         },
// //       };
// //     });
// //   } catch (error) {
// //     window.location.href = '/';

// //     return {
// //       props: {
// //         user: {
// //           name: '',
// //           phone: '',
// //           email: '',
// //         },
// //         wallet: {
// //           balance: 0,
// //           name: '',
// //         },
// //       },
// //     };
// //   }
// // }
// // const date = DateTimeUtils.getFormattedDate(new Date());

// const Test = ({ products = [] }) => (
//   <div className="SliderProductWrap">
//     {products?.map((item) => (
//       <ProductSliderSection
//         slug={item?.slug}
//         name={item?.name}
//         viewMore={item?.viewMore}
//         products={item?.data}
//       />
//     ))}
//   </div>
// );
// export default Test;
