import React from 'react';
import { NewBadge, EventBadge } from '../../atoms';
import StatusProductProps from './StatusProductProps';

const StatusProduct = ({ is_new: isNew, status, is_event: isEvent }) => {
  const statusProps = StatusProductProps[status];

  return (
    <>
      {isNew && <NewBadge>Mới</NewBadge>}
      {isEvent && <EventBadge>x1.5 Điểm Tích Lũy</EventBadge>}
      {statusProps}
    </>
  );
};
export default StatusProduct;
