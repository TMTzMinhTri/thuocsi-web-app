import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Image from 'next/image';
import { MISSING_IMAGE } from 'constants/Images';
import clsx from 'clsx';
import formatCurrency from 'utils/FormarCurrency';
import styles from './style.module.css';

const RemoveProductModal = memo((props) => {
  const { onClose, onRemove, visible, className, restProps, product } = props;
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?
          </Typography>
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
                {product.price && formatCurrency(product.price)}
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
      </Box>
    </Modal>
  );
});

export default RemoveProductModal;
