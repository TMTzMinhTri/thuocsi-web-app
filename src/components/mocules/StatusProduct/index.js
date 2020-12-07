import React from 'react';
import { NewBadge, EventBadge } from 'components/atoms';
import StatusProductProps from './StatusProductProps';

const StatusProduct = ({ is_new: isNew, status, is_event: isEvent }) => {
  const statusProps = StatusProductProps[status];

  return (
    <>
      {isNew && <NewBadge />}
      {isEvent && <EventBadge />}
      {statusProps}
    </>
  );
};
export default StatusProduct;
