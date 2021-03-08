import React, { useState } from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { Template, ProductCartList, CardInfo, LinkComp, LoadingScreen, Button } from 'components';
import { useCart } from 'context';
import { withLogin } from 'HOC';
import { doWithServerSide } from 'services';
import { QUICK_ORDER } from 'constants/Paths';
import { Alert } from '@material-ui/lab';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, () => ({ props: {} }));
}

function Cart({ isMobile, user }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  const [, setCartList] = useState();
  const { cartItems, loading, itemCount } = useCart();
  const pageTitle = `Giỏ hàng (${itemCount})`;
  const pageName = 'cart';
  if (loading) return <LoadingScreen />;
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName} pageTitle={pageTitle}>
      <Container className={styles.wrapper} maxWidth="lg">
        {user?.isActive || isMobile === false ? null : (
          <Alert className={styles.alert} severity="error">
            Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Vui lòng liên hệ
            02873008840 để kích hoạt
          </Alert>
        )}
        {user.level !== "LEVEL_GUEST" || isMobile === false ? null : (
          <Alert className={styles.alert} severity="error">
            Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Vui lòng liên hệ
            02873008840 để kích hoạt
          </Alert>
        )}
        {cartItems && cartItems.length > 0 ? (
          <>
            {!isMobile && (
              <div style={{ marginBottom: '12px' }}>
                <Typography className={styles.cart_title} variant="h5" component="h3">
                  Giỏ hàng
                </Typography>
              </div>
            )}
            <Grid container spacing={3}>
              <Grid sm={8} item>
                {/* san pham  */}
                <ProductCartList
                  setCartList={setCartList}
                  products={cartItems}
                  isMobile={isMobile}
                />
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
