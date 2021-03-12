import React from 'react';
import { Button } from 'components/atoms';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const TicketButton = ({ order, handleChangeOrderTicket, handleOpenModal }) => {
  const handleOnClick = () => {
    handleChangeOrderTicket(order);
    handleOpenModal();
  };
  return (
    <div>
      <Button
        startIcon={<InsertCommentIcon />}
        className="my-order__button my-order__button--blue"
        onClick={handleOnClick}
      >
        Gửi phản hồi
      </Button>
    </div>
  );
};

export default React.memo(TicketButton);
