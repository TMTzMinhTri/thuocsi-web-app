import React from 'react';
import styled from 'styled-components';
import CustomButton from './Button';

// const ButtonTypes = (theme, backgroundColor?) => ({
//   primary: {
//     color: theme.button.primary,
//     backgroundColor: backgroundColor || theme.button.background.primary,
//   },
// });

const Button = styled(CustomButton)`
  &,
  &:hover,
  &:foucs {
  }
  ,
  &:active {
  }
  ,
  &[disabled] {
    font-weight: 500;
    font-style: normal;
    border-color: none;
    display: flex;
    align-items: center;
  }
`;

export default React.memo(Button);
