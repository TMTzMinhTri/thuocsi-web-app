import React, { useRef } from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { ProductCardBuy, ProductCardContent } from '../../mocules';

import styles from './styles.module.css';

const ProductCardHorizontal = ({ product }) => {
  const searchInput = useRef(null);

  const handleFocus = () => {
    searchInput.current.focus();
  };
  return (
    <Box onClick={handleFocus} className={styles.button_container}>
      <Box className={styles.root_card}>
        <Card className={styles.product_card}>
          <Box className={styles.product_image}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="50"
                width="50"
                image="/images/slider/slider01.png"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Box>
          <ProductCardContent {...product} />
          <ProductCardBuy searchInput={searchInput} {...product} />
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCardHorizontal;
