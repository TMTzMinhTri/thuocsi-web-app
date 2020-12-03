import React, { memo } from 'react';
import { Modal } from '@material-ui/core';

const CustomModal = memo((props) => {
  const { className, children, ...rest } = props;
  return (
    <Modal className={className} {...rest}>
      {children}
    </Modal>
  );
});

export default CustomModal;
