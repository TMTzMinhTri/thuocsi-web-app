import React from 'react';
import styled from 'styled-components';
import CustomModal from './Modal';

const Modal = styled(CustomModal)`
  animation-duration: 0s !important;
`;

export default React.memo(Modal);
