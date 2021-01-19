import React from 'react';
import { Button } from 'components/atoms';
import { FEEDBACK } from 'constants/Paths';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const ResponseButton = ({ orderID = '', name = '', phone = '' }) => {
  const url = `${FEEDBACK}?order_id=${encodeURI(orderID)}&name=${encodeURI(name)}&phone=${encodeURI(phone)}`;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <Button startIcon={<InsertCommentIcon />} className="my-order__button my-order__button--outlined-blue">
        Gửi phản hồi
      </Button>
    </a>
  );
};

export default React.memo(ResponseButton);
