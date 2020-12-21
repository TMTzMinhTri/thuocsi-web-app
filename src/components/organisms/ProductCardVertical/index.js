import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { ProductCardBuy, ProductCardContent, StatusProduct } from '../../mocules';

import styles from './styles.module.css';

const ProductCardVertical = ({ product, type, cart, onIncrement, value }) => {
  const { image } = product;

  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <StatusProduct {...product} />
        <Card className={styles.product_card}>
          <Box>
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
          </Box>
          <ProductCardBuy
            value={value}
            product={product}
            onIncrement={onIncrement}
            cart={cart}
            type={type}
            row
            {...product}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCardVertical;
