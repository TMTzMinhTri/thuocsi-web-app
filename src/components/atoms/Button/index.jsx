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
  color: ${({ theme, btnType = 'primary', color }) =>
    buttonTypes({ theme, color })[btnType].color} !important;
  background-color: ${({ theme, btnType = 'primary', backgroundColor }) =>
    buttonTypes({ theme, backgroundColor })[btnType].background} !important;
  margin-right: 10px !important;
  border-radius: 50px !important;
`;

export default React.memo(CustomButton);
