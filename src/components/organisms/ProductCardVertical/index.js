import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { ProductCardBuy, ProductCardContent, StatusProduct } from '../../mocules';

import styles from './styles.module.css';

const ProductCardVertical = ({ product, type }) => {
  const { image } = product;

  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <StatusProduct {...product} />
        <Card className={styles.product_card}>
          <CardActionArea className={styles.product_image}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={image}
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <ProductCardContent row {...product} />
          <ProductCardBuy type={type} row {...product} />
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCardVertical;
