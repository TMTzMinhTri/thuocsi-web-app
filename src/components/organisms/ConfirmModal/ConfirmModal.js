import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './style.module.css';

const ConfirmModal = memo((props) => {
  console.log('render/....');

  const { onClose, handleSetImportant, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Bạn có chắc bạn muốn đánh dấu sản phẩm này là quan trọng trong đơn hàng hiện tại?
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Button className={clsx(styles.btn, styles.outlined_btn)}>Không</Button>
          <Button onClick={handleSetImportant} className={clsx(styles.btn, styles.fill_btn)}>
            Có
          </Button>
        </Box>
      </Box>
    </Modal>
  );
});

export default ConfirmModal;
