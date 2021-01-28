import React, { useRef } from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { MISSING_IMAGE } from 'constants/Images';
import { useRouter } from 'next/router';
import { getPathProductBySlug } from 'constants/Paths';
import ProductCardContent from 'components/mocules/ProductCardContent';
import ProductCardBuy from '../ProductCardBuy';

import styles from './styles.module.css';

const ProductCardHorizontal = ({ product, isMobile }) => {
  const router = useRouter();
  const searchInput = useRef(null);
  const { imageUrls, slug } = product;

  const handleFocus = () => {
    searchInput.current.focus();
  };
  return (
    <Box onClick={handleFocus} className={styles.button_container}>
      <Box className={styles.root_card}>
        <Card className={styles.product_card}>
          <Box className={styles.product_image}>
            <CardActionArea onClick={() => router.push(getPathProductBySlug(slug))}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="50"
                width="50"
                image={(imageUrls && imageUrls[0]) || MISSING_IMAGE}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Box>
          {isMobile ? (
            <div className={styles.rightBox}>
              <ProductCardContent tag cate {...product} isMobile={isMobile} />
              <ProductCardBuy searchInput={searchInput} {...product} product={product} />
            </div>
          ) : (
            <>
              <ProductCardContent tag cate {...product} />
              <ProductCardBuy searchInput={searchInput} {...product} product={product} />
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCardHorizontal;
