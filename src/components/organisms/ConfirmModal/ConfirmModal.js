import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';

import styles from './style.module.css';

const ConfirmModal = memo((props) => {
  const { onClose, onClickOk, visible, className, unset, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Bạn có chắc bạn muốn {unset && 'bỏ'} đánh dấu sản phẩm này là quan trọng trong đơn hàng hiện tại?
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Button className={clsx(styles.btn, styles.outlined_btn)} onClick={onClose}>
            Không
          </Button>
          <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)}>
            Có
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default ConfirmModal;