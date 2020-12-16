import React from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { Grade } from '@material-ui/icons';

import { ProductCardBuy, ProductCardContent } from '../../mocules';
import styles from './styles.module.css';

const ProductCart = React.memo((props) => {
  const { product, onClickShowModal, onRemove, onChange, form, onIncrement, onDecrement } = props;
  const handleSetImportant = () => {
    onClickShowModal(product.id);
  };
  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <Box onClick={handleSetImportant} className={styles.important_item}>
          <Grade
            className={product.isImportant ? styles.important_item_active : styles.star_icon}
          />
        </Box>
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
          <ProductCardBuy
            {...product}
            onRemove={onRemove}
            onChange={onChange}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            form={form}
            cart
          />
        </Card>
      </Box>
    </Box>
  );
});
export default ProductCart;
