import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const buttonTypes = ({ theme, backgroundColor, color }) => ({
  primary: {
    color: color || theme.button.color.primary,
    background: backgroundColor || theme.button.background.primary,
  },
  success: {
    color: color || theme.button.color.primary,
    background: backgroundColor || theme.button.background.success,
  },
  warning: {
    color: color || theme.button.color.primary,
    background: backgroundColor || theme.button.background.warning,
  },
});

const CustomButton = styled(Button)`
  color: ${({ theme, type = 'primary', color }) =>
    buttonTypes({ theme, color })[type].color} !important;
  background-color: ${({ theme, type = 'primary', backgroundColor }) =>
    buttonTypes({ theme, backgroundColor })[type].background} !important;
  margin-right: 10px !important;
  border-radius: 50px !important;
`;

export default React.memo(CustomButton);
