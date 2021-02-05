import React from 'react';
import Template from 'components/layout/Template';
import QuickOrderList from 'components/organisms/QuickOrderList';
import CardInfo from 'components/mocules/CardInfo';

import { Container, Typography, Grid } from '@material-ui/core';
import { doWithServerSide } from 'clients';
import { ProductService } from 'services';
import { withLogin } from 'HOC';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [productRes] = await Promise.all([
      ProductService.loadDataProduct({ ctx, isTotal: true }),
    ]);
    const page = Number(ctx.query.page) || 1;
    const { data = [], total = 0 } = productRes;
    return {
      props: {
        products: data,
        total,
        page,
      },
    };
  });
}

const QuickOrderPage = ({ products = [], isMobile, page = '', total = 0 }) => {
  const title = 'Đặt hàng nhanh – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'quick-order';
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <Container className={styles.wrapper} maxWidth="lg">
        {!isMobile && (
          <div style={{ marginBottom: '12px' }}>
            <Typography className={styles.cart_title} variant="h5" component="h3">
              Đặt hàng nhanh
            </Typography>
          </div>
        )}
        <Grid container spacing={3}>
          <Grid sm={8} item className={styles.quick_order_wrapper}>
            {/* san pham  */}
            {products && products.length > 0 ? (
              <QuickOrderList products={products} isMobile={isMobile} page={page} total={total} />
            ) : (
              <Typography variant="body1" gutterBottom>
                Không có sản phẩm
              </Typography>
            )}
          </Grid>
          {!isMobile && (
            <Grid sm={4} item>
              {/* gio hang */}
              <CardInfo className={styles.card_info} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Template>
  );
};

export default withLogin(QuickOrderPage);
