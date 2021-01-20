import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const parseOrderStatus = (status) => {
  if (ENUM_ORDER_STATUS.PENDING === status) return 'Chờ xác nhận';
  if (ENUM_ORDER_STATUS.CONFIRM === status) return 'Đã xác nhận';
  if (ENUM_ORDER_STATUS.CANCEL === status) return 'Đã huỷ';
  if (ENUM_ORDER_STATUS.DELIVERY === status) return 'Đang giao hàng';
  if (ENUM_ORDER_STATUS.COMPLETED === status) return 'Hoàn tất';
  return '';
};

const getOrderStatusColor = (status) => {
  if (ENUM_ORDER_STATUS.COMPLETED === status) return 'btn--complete';
  if (ENUM_ORDER_STATUS.DELIVERY === status) return 'btn--delivery';
  if (ENUM_ORDER_STATUS.CANCEL === status) return 'btn--cancel';
  return 'btn--default';
};

const StyledButton = styled(Button)`
  text-transform: none !important;
  padding: 0px 5px !important;
  font-size: 18px !important;
  color: white !important;
  &.btn--default {
    background-color: #919aa3 !important;
  }
  &.btn--delivery {
    background-color: yellow !important;
    color: #919aa3 !important;
  }

  &.btn--complete {
    background-color: #00c9a7 !important;
  }

  &.btn--cancel {
    background-color: #c34a36 !important;
  }
`;

const OrderStatusButton = ({ className, status, handleSetOrderStatus }) => {
  const handleClick = () => {
    if (
      status === ENUM_ORDER_STATUS.PENDING
      || status === ENUM_ORDER_STATUS.COMPLETED
      || status === ENUM_ORDER_STATUS.CANCEL
    ) {
      handleSetOrderStatus(status);
    }
  };
  return (
    <StyledButton
      variant="contained"
      className={`${className} ${getOrderStatusColor(status)}`}
      onClick={handleClick}
    >
      {parseOrderStatus(status)}
    </StyledButton>
  );
};

export default OrderStatusButton;
