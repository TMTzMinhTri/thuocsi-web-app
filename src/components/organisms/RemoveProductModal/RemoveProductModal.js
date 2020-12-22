import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Image from 'next/image';
import { MISSING_IMAGE } from 'constants/Images';
import clsx from 'clsx';
import FormatCurrency from 'utils/FormarCurrency';
import styles from './style.module.css';

const RemoveProductModal = memo((props) => {
  const { onClose, onRemove, visible, className, restProps, product } = props;
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <div className={styles.modal_content_wrap}>
            <Typography className={styles.modal_content}>
              Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?
            </Typography>
            <div className={styles.cart_box}>
              <div className={styles.cart_img}>
                <Image src={product.image || MISSING_IMAGE} width="77" height="58" />
              </div>
              <div className={styles.cart_info}>
                <div className={styles.cart_name}>{product.name}</div>
                <div className={styles.cart_price}>{FormatCurrency(product.price || 0)}</div>
              </div>
            </div>
          </div>
        </Box>
        {product
          && (
          <Card className={styles.remove_item}>
            <div className={styles.remove_item_image}>
              <Image
                className={styles.remove_item_image}
                src={product.image || MISSING_IMAGE}
                width={80}
                height={80}
                alt={product.name && product.name}
              />
            </div>
            <div className={styles.remove_item_content}>
              <div className={styles.remove_item_cart_name}>
                {product.name && product.name}
              </div>
              <div className={styles.remove_item_cart_price}>
                {product.price && FormatCurrency(product.price)}
              </div>
            </div>
          </Card>
          )}

        <Box mt={2} textAlign="center">
          <Button className={clsx(styles.btn, styles.outlined_btn)} onClick={onClose}>
            Không
          </Button>
          <Button onClick={() => onRemove()} className={clsx(styles.btn, styles.fill_btn)}>
            Có
          </Button>
        </Box>
      </div>
    </Modal>
  );
});

export default RemoveProductModal;
