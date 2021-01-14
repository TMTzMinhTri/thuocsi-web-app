import React, { memo } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const CustomButton = memo((props) => {
  const { btnType, children, className, suffix, color, backgroundColor, ...rest } = props;
  return (
    <Button className={className} {...rest}>
      {children}
      {suffix}
    </Button>
  );
});

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

const StyledButton = styled(CustomButton)`
  color: ${({ theme, btnType = 'primary', color }) =>
    buttonTypes({ theme, color })[btnType].color} !important;
  background-color: ${({ theme, btnType = 'primary', backgroundColor }) =>
    buttonTypes({ theme, backgroundColor })[btnType].background} !important;

  &.my-order__button {
    border-radius: 20px !important;
    padding: 0.25rem 0.5rem !important;
    font-size: 0.875rem !important;
    width: 9rem !important;
    margin: 0.25em !important;
    text-transform: none !important;
    background-color: transparent !important;

    &--secondary {
      color: #212529 !important;
      border: 1px solid #f9b514 !important;
      background-color: #f9b514 !important;
    }

    &--outlined-blue {
      color: #17a2b8 !important;
      border: 1px solid #17a2b8 !important;
    }

    &--outlined-green {
      color: #00b46e !important;
      border: 1px solid #00b46e !important;
    }
  }

  &.promo__button {
    color: #fff !important;
    background-color: #00b46e !important;
    border-color: #00b46e !important;
    text-transform: none !important;
    width: 100%;
    // padding: 5px 55px !important;
  }
`;

export default React.memo(StyledButton);

export const ButtonHeader = React.memo(styled(StyledButton)`
  margin-right: 10px !important;
  border-radius: 50px !important;
`);
