import React, { useState } from 'react';

import { Template, NavBar, Header, ProductCartList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import ProductClient from 'clients/ProductClient';

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
  const [quantity, setQuantity] = useState(products.length)
  const handleGetQuantity = (quanity) => {
    const sum = Object.keys(quanity).reduce((sum,key)=>sum+parseFloat(quanity[key]||0),0);
    setQuantity(sum)
  }
  
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
            <ProductCartList onGetQuantity={handleGetQuantity} products={products} />
          </Grid>
          <Grid sm={4} item>
            {/* gio hang */}
            <CardInfo
              className={styles.card_info}
              cart
              promo
              quantity={quantity}
              total="3.000.000.000 đ"
            />
          </Grid>
        </Grid>
      </Container>
    </Template>
  );
}
