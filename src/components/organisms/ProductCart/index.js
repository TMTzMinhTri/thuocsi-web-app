import React, { useState } from 'react';
import { Card, IconButton, CardActionArea, CardMedia } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';
import { MISSING_IMAGE } from 'constants/Images';
import useModal from 'hooks/useModal';
import { useCart } from 'context';
import { ProductCardContent, CustomModal } from 'components/mocules';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

const ProductCart = ({ product, name, isMobile, isImportant }) => {
  const [isShowModal, toggle] = useModal();
  const [isShowModalWarning, toggleWarning] = useModal();
  const { addImportant, removeImportant, cartItems = [] } = useCart();
  const maxImportant = Math.ceil((cartItems.length * 20) / 100);
  const [unset, setUnset] = useState(false);
  const { imagesProxy } = product;
  const importantList = cartItems.filter((item) => item.isImportant);
  const handleSetImportant = () => {
    if (isImportant) {
      setUnset(true);
    } else {
      if (importantList.length >= Math.floor((cartItems.length * 20) / 100)) {
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
    <div className={styles.button_container}>
      <div className={styles.root_card}>
        <IconButton
          onClick={handleSetImportant}
          className={clsx(styles.important_item, product.important && styles.important_item_active)}
        >
          <StarIcon style={{ color: isImportant ? '#f9b514' : '' }} />
        </IconButton>
        <Card className={styles.product_card}>
          <div className={styles.product_image}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={product.name}
                height="80"
                width="80"
                image={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=80`}
              />
            </CardActionArea>
          </div>
          {isMobile ? (
            <div className={styles.cart_content_mobile}>
              <ProductCardContent className={styles.product_content} row {...product} />
              <ProductCardBuy
                cartItems={cartItems}
                {...product}
                product={product}
                cart
                name={name}
                isMobile={isMobile}
              />
            </div>
          ) : (
            <>
              <ProductCardContent className={styles.product_content} row {...product} />
              <ProductCardBuy
                cartItems={cartItems}
                {...product}
                product={product}
                cart
                name={name}
                isMobile={isMobile}
              />
            </>
          )}
        </Card>
      </div>
      <CustomModal
        onClickOk={handleConfirmImportantModal}
        visible={isShowModal}
        onClose={toggle}
        title="Xin xác nhận"
        content={`Bạn có chắc bạn muốn ${
          unset ? 'bỏ' : ''
        } đánh dấu sản phẩm này là quan trọng trong đơn hàng hiện tại?`}
      />

      <CustomModal
        onClose={toggleWarning}
        visible={isShowModalWarning}
        title="Đánh dấu sản phẩm quan trọng"
        content={`Bạn cần thêm ${
          importantList.length === maxImportant
            ? maxImportant * 5
            : maxImportant * 5 - cartItems.length
        } sản phẩm vào giỏ hàng để có thể đánh dấu quan trọng`}
        btnOnClose="Đóng"
        btnOkRender={false}
      />
    </div>
  );
};
export default ProductCart;
