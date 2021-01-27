import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';

import styles from './style.module.css';

const EditOrderModal = memo((props) => {
  const { onClose, onClickOk, visible, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <Typography className={styles.modal_content}>
            Đơn của bạn sẽ được trả về lại giỏ hàng. Bạn&nbsp;
            <strong>cần bấm Thanh Toán lại </strong>
            đơn hàng ngay sau khi chỉnh sửa xong. Nếu không xác nhận ngay, giá sản phẩm có thể thay
            đổi theo giá tăng/giảm hàng ngày. Bạn có chắc muốn sửa lại đơn này?
          </Typography>
        </div>
        <Box mt={2} textAlign="center">
          <Button className={clsx(styles.btn, styles.outlined_btn)} onClick={onClose}>
            Không
          </Button>
          <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)}>
            Có
          </Button>
        </Box>
      </div>
    </Modal>
  );
});

export default EditOrderModal;
