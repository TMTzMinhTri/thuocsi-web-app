import React, { memo } from 'react';
import { Modal } from '@material-ui/core';

const CustomModal = memo((props) => {
  const { className, children, ...rest } = props;
  return (
    <Modal
      className={className}
      {...rest}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      {children}
    </Modal>
  );
});

export default CustomModal;
