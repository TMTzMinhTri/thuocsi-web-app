import React, { useState } from 'react';
import { Card, Box, CardActionArea, CardMedia } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import clsx from 'clsx';
import { MISSING_IMAGE } from 'constants/Images';
import useModal from 'hooks/useModal';
import { useCart } from 'context';
import { ProductCardContent, CustomModal } from 'components/mocules';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

const ProductCart = ({ product, name }) => {
  const [isShowModal, toggle] = useModal();
  const [isShowModalWarning, toggleWarning] = useModal();
  const { addImportant, removeImportant, cartItems } = useCart();
  const [unset, setUnset] = useState(false);

  const { isImportant, imageUrls } = product;

  const handleSetImportant = () => {
    const importantList = cartItems.filter((item) => item.isImportant);
    if (isImportant) {
      setUnset(true);
    } else {
      if (importantList.length >= (Math.floor((cartItems.length * 20) / 100) || 1)) {
        toggleWarning();
        return;
      }
      setUnset(false);
    }
    toggle();
  };

  const handleConfirmImportantModal = () => {
    if (isImportant) {
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
          className={clsx(styles.important_item, product.important && styles.important_item_active)}
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
                image={(imageUrls && imageUrls[0]) || MISSING_IMAGE}
              />
            </CardActionArea>
          </Box>
          <ProductCardContent className={styles.product_content} row {...product} />
          <ProductCardBuy {...product} product={product} cart name={name} />
        </Card>
      </Box>
      <CustomModal
        onClickOk={handleConfirmImportantModal}
        visible={isShowModal}
        onClose={toggle}
        title="Xin xác nhận"
        content={`Bạn có chắc bạn muốn ${
          unset && 'bỏ'
        } đánh dấu sản phẩm này là quan trọng trong đơn hàng hiện tại?`}
      />

      <CustomModal
        onClose={toggleWarning}
        visible={isShowModalWarning}
        title="Xin xác nhận"
        content="Số lượng sản phẩm được đánh dấu quan trọng không được nhiều hơn 20% tổng số sản phẩm"
        btnOnClose="OK"
      />
    </Box>
  );
};
export default ProductCart;
