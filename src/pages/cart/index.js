import React, { useState } from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import Template from 'components/layout/Template';
import { Button, LinkComp } from 'components/atoms';
import CardInfo from 'components/mocules/CardInfo';
import { LoadingScreen, ProductCartList } from 'components/organisms';

import { useCart } from 'context';
import { withLogin } from 'HOC';
import { doWithServerSide } from 'services/SsrService';
import { QUICK_ORDER } from 'constants/Paths';
import { Alert } from '@material-ui/lab';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, () => ({ props: {} }));
}

function Cart({ isMobile, user }) {
  const title = 'Giỏ hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  const [, setCartList] = useState();
  const { cartItems = [], loading, itemCount } = useCart();
  const pageTitle = `Giỏ hàng (${itemCount})`;
  const pageName = 'cart';
  if (loading) return <LoadingScreen />;

  const isHaveProductDeal = cartItems.filter((item) => item.cartItemType === 'DEAL').length > 0;

  return (
    <Template
      title={title}
      isMobile={isMobile}
      pageName={pageName}
      pageTitle={pageTitle}
      point={user?.point || 0}
      balance={user.balance}
    >
      <Container className={styles.wrapper} maxWidth="lg">
        {user?.isQuest && isMobile && (
          <Alert className={styles.alert} severity="error">
            Đây là tài khoản dùng thử. Giỏ hàng sẽ không thể lưu và thanh toán được. Xin bạn vui
            lòng tạo tài khoản cá nhân để sử dụng tính năng này! Cảm ơn!
          </Alert>
        )}
        {!user?.isActive && isMobile && (
          <Alert className={styles.alert} severity="error">
            Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt.
          </Alert>
        )}

        {cartItems && cartItems.length > 0 ? (
          <>
            {!isMobile && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <Typography className={styles.cart_title} variant="h5" component="h3">
                    Giỏ hàng
                  </Typography>
                </div>
                {isHaveProductDeal && (
                  <div className={styles.instruction_text}>
                    <Alert className={styles.alert} severity="error">
                      Lưu ý: Giỏ hàng có sản phẩm khuyến mãi. Sau khi thanh toán, đơn hàng sẽ không
                      thể chỉnh sửa được.
                    </Alert>
                  </div>
                )}
              </>
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
