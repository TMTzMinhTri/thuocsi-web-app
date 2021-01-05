import React from 'react';

import { Template, NavBar, Header, QuickOrderList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import ProductClient from 'clients/ProductClient';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataProduct(ctx)]);
  return {
    props: {
      products,
    },
  };
}

export default function QuickOrderPage({ mostResearched = [], products = [] }) {
  const title = 'Đặt hàng nhanh – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'quick-order';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} pageName={pageName} />
      <Container className={styles.wrapper} maxWidth="lg">
        <Box mb={1.5}>
          <Typography className={styles.cart_title} variant="h5" component="h3">
            Đặt hàng nhanh
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid sm={8} item>
            {/* san pham  */}
            {products && products.length > 0
              ? <QuickOrderList products={products} />
              : (
                <Typography variant="body1" gutterBottom>
                  Ko có sản phẩm
                </Typography>
              )}

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
