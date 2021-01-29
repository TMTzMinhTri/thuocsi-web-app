import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography, Box } from '@material-ui/core';
import clsx from 'clsx';

import styles from './style.module.css';

const CustomModal = memo(
  ({
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    btnOk = 'Có',
    btnOnClose = 'Không',
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <Box className={styles.confirm_modal_wrap}>
        <Box textAlign="center">
          <Box className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </Box>
          <Typography className={styles.modal_title}>{title}</Typography>
          <Typography className={styles.modal_content}>{content}</Typography>
        </Box>
        <Box mt={2} textAlign="center">
          {onClose ? (
            <Button className={clsx(styles.btn, styles.brown_btn)} onClick={onClose}>
              {btnOnClose}
            </Button>
          ) : null}
          {onClickOk ? (
            <Button onClick={onClickOk} className={clsx(styles.btn, styles.fill_btn)}>
              {btnOk}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Modal>
  ),
);

export default React.memo(CustomModal);
