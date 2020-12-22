import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import Image from 'next/image';
import clsx from 'clsx';
import { MISSING_IMAGE } from 'constants/Images';
import FormarCurrency from 'utils/FormarCurrency';
import styles from './style.module.css';

const RemoveProductModal = memo((props) => {
  const { onClose, product, onRemove, visible, className, restProps } = props;
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
                <div className={styles.cart_price}>{FormarCurrency(product.price || 0)}</div>
              </div>
            </div>
          </div>
        </Box>
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
