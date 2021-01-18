import React, { useState } from 'react';
import { Template, ProductCartList, CardInfo, LinkComp, LoadingScreen } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { Button } from 'components/atoms';
import { useCart, withLogin } from 'context';
import { doWithServerSide } from 'clients';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, () => ({ props: {} }));
}

function Cart({ isMobile }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [, setCartList] = useState();
  const { cartItems, loading } = useCart();
  const pageName = 'cart';
  if (loading) return (<LoadingScreen />);
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <Container className={styles.wrapper} maxWidth="lg">
        {cartItems && cartItems.length > 0 ? (
          <>
            <Box mb={1.5}>
              <Typography className={styles.cart_title} variant="h5" component="h3">
                Giỏ hàng
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid sm={8} item>
                {/* san pham  */}
                <ProductCartList setCartList={setCartList} products={cartItems} />
              </Grid>
              {!isMobile && (
                <Grid sm={4} item>
                  {/* gio hang */}
                  <CardInfo className={styles.card_info} cart promo />
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <Container>
            <Typography className={styles.card_title_empty}>Giỏ hàng của bạn trống</Typography>
            <Box justifyContent="center" display="flex">
              <LinkComp href="/quick-order">
                <Button
                  className={styles.card_button_empty}
                  variant="contained"
                  color="#fff"
                  style={{ marginRight: '0 !important' }}
                >
                  Về trang đặt hàng nhanh
                </Button>
              </LinkComp>
            </Box>
          </Container>
        )}
      </Container>
    </Template>
  );
}

export default withLogin(Cart);
