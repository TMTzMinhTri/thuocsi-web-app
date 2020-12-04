import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { RibbonPriceUp } from 'components/atoms';
import { ProductCardBuy, ProductCardContent } from 'components/mocules';

import styles from './styles.module.css';

const ProductCard = ({ product }) => {
  const { not_support_delivery: noSupportDelivery } = product;
  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <RibbonPriceUp />
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
          <ProductCardContent {...product} />
          <ProductCardBuy noSupportDelivery={noSupportDelivery} />
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCard;
