import React, { useRef } from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { MISSING_IMAGE } from 'constants/Images';
import { useRouter } from 'next/router';
import { ProductCardBuy, ProductCardContent } from '../../mocules';

import styles from './styles.module.css';

const ProductCardHorizontal = ({ product }) => {
  const router = useRouter();
  const searchInput = useRef(null);
  const { image } = product;

  const handleFocus = () => {
    searchInput.current.focus();
  };
  return (
    <Box onClick={handleFocus} className={styles.button_container}>
      <Box className={styles.root_card}>
        <Card className={styles.product_card}>
          <Box className={styles.product_image}>
            <CardActionArea onClick={() => router.push(`/product/${product.slug}`)}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="50"
                width="50"
                image={image || MISSING_IMAGE}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Box>
          <ProductCardContent tag cate {...product} />
          <ProductCardBuy searchInput={searchInput} {...product} product={product} />
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCardHorizontal;
