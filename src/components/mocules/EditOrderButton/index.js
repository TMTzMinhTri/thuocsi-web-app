import React from 'react';
import { Button } from 'components/atoms';

const EditOrderButton = () => (
  <Button className="my-order__button my-order__button--outlined-green">Sửa đơn hàng</Button>
);

export default React.memo(EditOrderButton);
