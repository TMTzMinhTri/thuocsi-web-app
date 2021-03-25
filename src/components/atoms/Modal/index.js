import React, { memo } from 'react';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';

const ModalItem = memo((props) => {
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
const StyledModal = styled(ModalItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  &.signup-modal .auth-modal-content{
    height: 100%;
  }
`;

export default React.memo(StyledModal);
