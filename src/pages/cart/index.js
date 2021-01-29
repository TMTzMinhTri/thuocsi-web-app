import React, { useState } from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { Template, ProductCartList, CardInfo, LinkComp, LoadingScreen, Button } from 'components';
import { useCart, withLogin } from 'context';
import { doWithServerSide } from 'clients';
import { QUICK_ORDER } from 'constants/Paths';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, () => ({ props: {} }));
}

function Cart({ isMobile, user }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [, setCartList] = useState();
  const { cartItems, loading } = useCart();
  const pageName = 'cart';
  if (loading) return <LoadingScreen />;
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <Container className={styles.wrapper} maxWidth="lg">
        {cartItems && cartItems.length > 0 ? (
          <>
            <div style={{ marginBottom: '12px' }}>
              <Typography className={styles.cart_title} variant="h5" component="h3">
                Giỏ hàng
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid sm={8} item>
                {/* san pham  */}
                <ProductCartList setCartList={setCartList} products={cartItems} />
              </Grid>
              {!isMobile && (
                <Grid sm={4} item>
                  {/* gio hang */}
                  <CardInfo user={user} className={styles.card_info} cart promo />
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <Container>
            <Typography className={styles.card_title_empty}>Giỏ hàng của bạn trống</Typography>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <LinkComp href={QUICK_ORDER}>
                <Button
                  className={styles.card_button_empty}
                  variant="contained"
                  color="#fff"
                  style={{ marginRight: '0 !important' }}
                >
                  Về trang đặt hàng nhanh
                </Button>
              </LinkComp>
            </div>
          </Container>
        )}
      </Container>
    </Template>
  );
}

export default withLogin(Cart);
