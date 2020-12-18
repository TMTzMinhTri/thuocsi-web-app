import React, { useState } from 'react';

import { Template, NavBar, Header, ProductCartList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import ProductClient from 'clients/ProductClient';

import FormarCurrency from 'utils/FormarCurrency';
import styles from './style.module.css';

export async function getServerSideProps() {
  // get products
  const [products] = await Promise.all([ProductClient.loadDataProduct()]);
  return {
    props: {
      products,
    },
  };
}

export default function Cart({ mostResearched = [], products = [] }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [cart, setCartList] = useState();
  const getQuantity = cart?.reduce((acc, cum) => acc + cum.quantity, 0) || products.length;
  const cartPriceTotal = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container className={styles.wrapper} maxWidth="lg">
        <Box>
          <Typography>Giỏ hàng</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid sm={8} item>
            {/* san pham  */}
            <ProductCartList setCartList={setCartList} products={products} />
          </Grid>
          <Grid sm={4} item>
            {/* gio hang */}
            <CardInfo
              className={styles.card_info}
              cart
              promo
              quantity={getQuantity}
              total={FormarCurrency(cartPriceTotal || 0)}
            />
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
}
