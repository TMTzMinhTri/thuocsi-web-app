import React, { useState } from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import { MISSING_IMAGE } from 'constants/Images';
import useModal from 'hooks/useModal';
import { useCart } from 'context';
import { ProductCardBuy, ProductCardContent } from '../../mocules';
import ConfirmModal from '../ConfirmModal';
import styles from './styles.module.css';

const ProductCart = React.memo((props) => {
  const {
    product,
    onRemove,
    onChange,
    onIncrement,
    onDecrement,
    name,
    value,
  } = props;
  const [isShowModal, toggle] = useModal();
  const { addImportant, removeImportant } = useCart();
  const [unset, setUnset] = useState(false);
  const handleSetImportant = () => {
    if (product.important) {
      setUnset(true);
    } else {
      setUnset(false);
    }
    toggle();
  };

  const handleImportant = () => {
    if (product.important) {
      removeImportant(product);
    } else {
      addImportant(product);
    }
    toggle();
  };

  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <Box
          onClick={handleSetImportant}
          className={[styles.important_item, product.important && styles.important_item_active]}
        >
          <Grade
            className={product.isImportant ? styles.important_item_active : styles.star_icon}
          />
        </Box>
        <Card className={styles.product_card}>
          <Box className={styles.product_image}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={product.name}
                height="80"
                width="80"
                image={product.image || MISSING_IMAGE}
              />
            </CardActionArea>
          </Box>
          <ProductCardContent className={styles.product_content} row {...product} />
          <ProductCardBuy
            {...product}
            product={product}
            onRemove={onRemove}
            onChange={onChange}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            cart
            name={name}
            value={value}
          />
        </Card>
      </Box>
      <ConfirmModal
        onClickOk={handleImportant}
        unset={unset}
        visible={isShowModal}
        onClose={toggle}
      />
    </Box>
  );
});
export default ProductCart;
