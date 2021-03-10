import React from 'react';
import { Button } from 'components/atoms';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { useModal } from 'hooks';
import TicketFormModal from './TicketFormModal';

const TicketButton = ({
  orderID = '',
  name = '',
  phone = '',
  orderNo = '',
  orderTime = Date.now(),
}) => {
  const [open, toggleOpen] = useModal();
  return (
    <div>
      <Button
        startIcon={<InsertCommentIcon />}
        className="my-order__button my-order__button--blue"
        onClick={toggleOpen}
      >
        Gửi phản hồi
      </Button>
      <TicketFormModal
        visible={open}
        orderID={orderID}
        name={name}
        phone={phone}
        orderNo={orderNo}
        orderTime={orderTime}
        onClose={toggleOpen}
      />
    </div>
  );
};

export default React.memo(TicketButton);
