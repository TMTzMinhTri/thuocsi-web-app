import React from 'react';
import styled from 'styled-components';
import CustomModal from './Modal';

const Modal = styled(CustomModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default React.memo(Modal);
