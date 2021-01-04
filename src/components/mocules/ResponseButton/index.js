import React from 'react';
import { Button } from 'components/atoms';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const ResponseButton = () => (
  <Button startIcon={<InsertCommentIcon />} className="my-order__button my-order__button--outlined-blue">
    Gửi phản hồi
  </Button>
);

export default React.memo(ResponseButton);
