import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { ProductCardBuy, ProductCardContent, StatusProduct } from '../../mocules';

import styles from './styles.module.css';

const ProductCardVertical = ({ product, type }) => (
  <Box className={styles.button_container}>
    <Box className={styles.root_card}>
      <StatusProduct {...product} />
      <Card className={styles.product_card}>
        <CardActionArea className={styles.product_image}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="/images/slider/slider01.png    "
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <ProductCardContent row {...product} />
        <ProductCardBuy type={type} row {...product} />
      </Card>
    </Box>
  </Box>
);

export default ProductCardVertical;
