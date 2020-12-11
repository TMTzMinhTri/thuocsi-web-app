import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
// import useModal from 'hooks/useModal';

import { ProductCardBuy, ProductCardContent } from '../../mocules';
// import ConfirmModal from '../ConfirmModal';
import styles from './styles.module.css';

const ProductCart = ({ product, toggle, important, handleSetImportant }) => {
  const handleSetImportance = () => {
    // console.log('key', key);
    // const newId = setId(id);
    toggle();
    handleSetImportant(product.is_star);
  };
  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <Box onClick={handleSetImportance} className={styles.important_item}>
          <Grade className={important ? styles.important_item_active : styles.star_icon} />
        </Box>
        {/* <ConfirmModal
          handleSetImportant={handleSetImportant}
          visible={isShowModal}
          onClose={toggle}
        /> */}
        <Card className={styles.product_card}>
          <Box className={styles.product_image}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="80"
                width="80"
                image="/images/slider/slider01.png"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Box>
          <ProductCardContent className={styles.product_content} row {...product} />
          <ProductCardBuy cart {...product} />
        </Card>
      </Box>
    </Box>
  );
};
export default ProductCart;
