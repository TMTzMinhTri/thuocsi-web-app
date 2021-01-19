import React from 'react';

import { Template, QuickOrderList, CardInfo } from 'components';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { ProductClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const isTotal = false;
    const [products] = await Promise.all([ProductClient.loadDataProduct(ctx, isTotal)]);
    return {
      props: {
        products: products.data,
      },
    };
  });
}

const QuickOrderPage = ({ products = [], isMobile }) => {
  const title = 'Đặt hàng nhanh – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'quick-order';
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <Container className={styles.wrapper} maxWidth="lg">
        {!isMobile && (
          <Box mb={1.5}>
            <Typography className={styles.cart_title} variant="h5" component="h3">
              Đặt hàng nhanh
            </Typography>
          </Box>
        )}
        <Grid container spacing={3}>
          <Grid sm={8} item>
            {/* san pham  */}
            {products && products.length > 0 ? (
              <QuickOrderList products={products} isMobile={isMobile} />
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
