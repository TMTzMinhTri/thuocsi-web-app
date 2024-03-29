import React, { memo } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { palette } from 'constants/Colors';

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
    color: color || theme.button.color.secondary,
    background: backgroundColor || theme.button.background.warning,
  },
  disabled: {
    background: backgroundColor || theme.button.background.disabled,
    color: '#212529',
  },
  payment: {
    color: '#212529',
    background: '#f9b514',
    borderColor: '#f9b514',
  },
  tags: {
    color: color || '#000',
    background: '#fff',
  },
});

const StyledButton = styled(CustomButton)`
  color: ${({ theme, btnType = 'primary', color, disabled }) =>
    buttonTypes({ theme, color })[disabled ? 'disabled' : btnType].color} !important;
  background-color: ${({ theme, btnType = 'primary', backgroundColor, disabled }) =>
    buttonTypes({ theme, backgroundColor })[disabled ? 'disabled' : btnType].background} !important;

  &.my-order__button {
    border-radius: 20px !important;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem !important;
    width: 9rem !important;
    margin: 0.25em !important;
    text-transform: none !important;
    background-color: transparent !important;

    &--secondary {
      color: #212529 !important;
      border: 1px solid #f9b514 !important;
      background-color: #f9b514 !important;
      &:hover {
        background: #fff !important;
      }

      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
      }
    }

    &--blue {
      border: 1px solid #17a2b8 !important;
      background: #17a2b8 !important;
      color: #fff !important;
      transition: 0.2s;
      &:hover {
        color: #17a2b8 !important;
        background: #fff !important;
      }
    }

    &--green {
      color: #fff !important;
      background-color: #00b46e !important;
      border: 1px solid #00b46e !important;
      &:hover {
        color: #00b46e !important;
        background-color: #fff !important;
      }

      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
        background: ${palette.grey.default} !important;
        border: 1px solid ${palette.grey.default} !important;
      }
    }
  }

  &.promo__button {
    color: #fff !important;
    background-color: #00b46e !important;
    border-color: #00b46e !important;
    text-transform: none !important;
    width: 100%;

      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
        background: ${palette.grey.default} !important;
        border: 1px solid ${palette.grey.default} !important;
      }
  }

  &.payment_button {
    width: 100%;
    border-radius: 50px !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
    justify-content: center;
    text-transform: unset !important;
    font-weight: 500;
    margin: 10px;
    &.Mui-disabled {
      color: #212529 !important;
      opacity: 0.65 !important;
      background: ${palette.grey.default} !important;
      border: 1px solid ${palette.grey.default} !important;
    }
  }

  &.response__button--upload {
    margin: 15px 0 !important;
    padding: 30px !important;
    width: 100%;
    background: #fff !important;
    color: rgba(0, 0, 0, 0.23) !important;
    border: 1px solid rgba(0, 0, 0, 0.23) !important;
    &.Mui-disabled {
      color: #212529 !important;
      opacity: 0.65 !important;
      background: ${palette.grey.default} !important;
      border: 1px solid ${palette.grey.default} !important;
    }
  }

  &.response__button--send {
    padding: 10px 30px !important;
    color: #fff !important;
    background-color: #007bff !important;
    border-color: #007bff !important;
}
  }
`;

export default React.memo(StyledButton);

export const ButtonHeader = React.memo(styled(StyledButton)`
  margin-right: 10px !important;
  border-radius: 50px !important;
`);

export const ButtonDefault = styled(StyledButton)`
  padding: 6px 16px;
  border-radius: 8px;
}`;

export const ButtonDefaultLogin = styled(StyledButton)`
  padding: 6px 16px;
  border-radius: 8px;
  margin: 15px;
}`;
