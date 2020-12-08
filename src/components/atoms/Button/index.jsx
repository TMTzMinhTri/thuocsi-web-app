import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const buttonTypes = (theme, backgroundColor) => ({
  primary: {
    color: theme.button.color.primary,
    background: backgroundColor || theme.button.background.primary,
  },
  success: {
    color: theme.button.color.primary,
    background: backgroundColor || theme.button.background.success,
  },
  warning: {
    color: theme.button.color.primary,
    background: backgroundColor || theme.button.background.warning,
  },
});

const CustomButton = styled(Button)`
  color: ${({ theme, type = 'primary' }) => buttonTypes(theme)[type].color} !important;
  background-color: ${({ theme, type = 'primary', backgroundColor }) =>
    buttonTypes(theme, backgroundColor)[type].background} !important;
  margin-right: 10px !important;
  border-radius: 50px !important;
`;

export default React.memo(CustomButton);
