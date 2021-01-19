import React from 'react';
import { Button } from 'components/atoms';
import { FEEDBACK } from 'constants/Paths';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const ResponseButton = ({ orderID = '', name = '', phone = '' }) => {
  const query = { order_id: orderID, name, phone };
  const strigify = encodeURI(JSON.stringify(query));
  const url = `${FEEDBACK}?${strigify}`;
  return (
    <a href={url}>
      <Button startIcon={<InsertCommentIcon />} className="my-order__button my-order__button--outlined-blue">
        Gửi phản hồi
      </Button>
    </a>
  );
};

export default React.memo(ResponseButton);
