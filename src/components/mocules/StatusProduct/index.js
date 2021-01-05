import React from 'react';
import EventBadge from '../EventBadge';
import NewBadge from '../NewBadge';
import StatusProductProps from './StatusProductProps';

const StatusProduct = ({ is_new: isNew, status, is_event: isEvent }) => {
  const statusProps = StatusProductProps[status];

  return (
    <>
      {isNew && <NewBadge>Mới</NewBadge>}
      {isEvent && (
        <EventBadge url="https://thuocsi.vn/events/nguoi-viet-dung-hang-viet-nhan-1-5-diem-tich-luy">
          x1.5 Điểm Tích Lũy
        </EventBadge>
      )}
      {statusProps}
    </>
  );
};
export default StatusProduct;
