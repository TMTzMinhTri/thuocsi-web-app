import React, { useState } from 'react';

import { Template, NavBar, Header, QuickOrderList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { useCart } from 'context';
import styles from './style.module.css';

export default function Cart({ mostResearched = [] }) {
  const title = 'Đặt hàng nhanh – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [, setCartList] = useState();
  const { cartItems } = useCart();
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container className={styles.wrapper} maxWidth="lg">
        <Box mb={1.5}>
          <Typography className={styles.cart_title} variant="h5" component="h3">
            Đặt hàng nhanh
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid sm={8} item>
            {/* san pham  */}
            <QuickOrderList setCartList={setCartList} products={cartItems} />
          </Grid>
          <Grid sm={4} item>
            {/* gio hang */}
            <CardInfo className={styles.card_info} />
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
}
