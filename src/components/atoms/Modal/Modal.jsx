import React, { memo } from 'react';
import { Modal } from '@material-ui/core';

const CustomModal = memo((props) => {
  const { className, onClose, children, ...rest } = props;
  return (
    <Modal
      className={className}
      onClose={onClose}
      {...rest}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      {children}
    </Modal>
  );
});

export default CustomModal;
