import React, { useState } from 'react';
import { Button } from 'components/atoms';
import EditOrderModal from '../EditOrderModal';

const EditOrderButton = () => {
  const [val, setVal] = useState(false);
  const handleChangeVal = () => {
    setVal(!val);
  };
  return (
    <>
      <Button className="my-order__button my-order__button--outlined-green" onClick={handleChangeVal}>Sửa đơn hàng</Button>
      <EditOrderModal visible={val} onClose={handleChangeVal} />
    </>
  );
};

export default React.memo(EditOrderButton);
