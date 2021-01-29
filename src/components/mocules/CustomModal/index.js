import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { Button, Typography } from '@material-ui/core';
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
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>{title}</Typography>
          <Typography className={styles.modal_content}>{content}</Typography>
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
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
        </div>
      </div>
    </Modal>
  ),
);

export default React.memo(CustomModal);
