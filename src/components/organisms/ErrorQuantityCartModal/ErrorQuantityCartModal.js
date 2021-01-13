import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';

import styles from './style.module.css';

const ErrorModal = memo((props) => {
  const { onClose, visible, className, restProps, product } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_content}>
            <div>
              Mỗi đơn chỉ được phép đặt tối đa <b>{product && product.maxQuantity}</b> sản phẩm
            </div>
            <div><b>{product && product.skuId}</b></div>
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" className={styles.btn} onClick={onClose}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default ErrorModal;
