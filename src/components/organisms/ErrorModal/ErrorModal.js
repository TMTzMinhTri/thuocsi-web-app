import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './style.module.css';

const ErrorModal = memo((props) => {
  const { onClose, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Số lượng sản phẩm được đánh dấu quan trọng không được nhiều hơn 20% tổng số sản phẩm
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
