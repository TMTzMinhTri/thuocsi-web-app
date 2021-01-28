import React, { useState } from 'react';
import { Button } from 'components/atoms';
import { useRouter } from 'next/router';
import { CART_URL } from 'constants/Paths';
import EditOrderModal from '../EditOrderModal';

const EditOrderButton = () => {
  const [val, setVal] = useState(false);
  const router = useRouter();
  const handleChangeVal = () => {
    setVal(!val);
  };
  const handleClickOk = () => {
    router.push(CART_URL);
  };
  return (
    <>
      <Button
        className="my-order__button my-order__button--outlined-green"
        onClick={handleChangeVal}
      >
        Sửa đơn hàng
      </Button>
      <EditOrderModal visible={val} onClose={handleChangeVal} onClickOk={handleClickOk} />
    </>
  );
};

export default React.memo(EditOrderButton);
