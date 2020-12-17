import React from 'react';

import { Template, NavBar, Header, ProductCartList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { Button } from 'components/atoms';
// import ProductClient from 'clients/ProductClient';
import Link from 'next/link';
import { useCart } from 'context';
import styles from './style.module.css';

// export async function getServerSideProps() {
//   // get products
//   const [products] = await Promise.all([ProductClient.loadDataProduct()]);
//   return {
//     props: {
//       products,
//     },
//   };
// }

export default function Cart({ mostResearched = [] }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  // const [cart, setCartList] = useState();
  const { cartItems } = useCart();
  // const getQuantity = cart?.reduce((acc, cum) => acc + cum.quantity, 0) || products.length;
  // const cartPriceTotal = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container className={styles.wrapper} maxWidth="lg">
        {cartItems ? (
          <>
            <Box mb={1.5}>
              <Typography className={styles.cart_title} variant="h5" component="h3">
                Giỏ hàng
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid sm={8} item>
                {/* san pham  */}
                <ProductCartList products={cartItems} />
              </Grid>
              <Grid sm={4} item>
                {/* gio hang */}
                <CardInfo
                  className={styles.card_info}
                  cart
                  promo
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Container>
            <Typography className={styles.card_title_empty}>Giỏ hàng của bạn trống</Typography>
            <Box justifyContent="center" display="flex">
              <Link href="/quick-order">
                <Button
                  className={styles.card_button_empty}
                  variant="contained"
                  color="#fff"
                  style={{ marginRight: '0 !important' }}
                >
                  Về trang đặt hàng nhanh
                </Button>
              </Link>
            </Box>
          </Container>
        )}
      </Container>
    </Template>
  );
}
