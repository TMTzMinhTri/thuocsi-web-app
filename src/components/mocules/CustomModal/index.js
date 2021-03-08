import React, { memo } from 'react';
import { Modal, ButtonDefaultLogin } from 'components/atoms';
import { Typography } from '@material-ui/core';

import styles from './style.module.css';


const CustomModal = memo(
  ({
    children,
    onClose,
    onClickOk,
    visible,
    className,
    restProps,
    title,
    content,
    btnOk = 'Có',
    btnOnClose = 'Không',
    customBtnOk = <ButtonDefaultLogin btnType="warning" onClick={onClose}>{btnOnClose}</ButtonDefaultLogin>
  }) => (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          {title && <Typography className={styles.modal_title}>{title}</Typography>}
          {content && <Typography className={styles.modal_content}>{content}</Typography>}
        </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          {customBtnOk && customBtnOk}
          {onClickOk && <ButtonDefaultLogin onClick={onClickOk}>{btnOk}</ButtonDefaultLogin>}
        </div>
        {children}
      </div>
    </Modal>
  ),
);

export default React.memo(CustomModal);
