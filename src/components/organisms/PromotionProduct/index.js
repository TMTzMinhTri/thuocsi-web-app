import React from 'react';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import ProductCardVertical from '../ProductCardVertical';
import styles from './styles.module.css';

const PromotionProduct = ({ products = [] }) => (
  <>
    {products.length > 0 ? (
      <main className={styles.product_listing}>
        <div className={styles.product_grid_wrapper}>
          <Grid container spacing={2}>
            {products.map((item) => (
              <Grid key={uuidv4()} item xl={3} lg={3} md={2} xs={6} className={styles.customGrid}>
                <ProductCardVertical
                  key={`products-${item.sku}`}
                  product={item}
                  value={item.quantity || 0}
                  category
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    ) : (
      <p className={styles.noData}>Không có sản phẩm khuyến mãi</p>
    )}
  </>
);

export default PromotionProduct;
