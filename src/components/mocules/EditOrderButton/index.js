import React, { useState } from 'react';
import { Button } from 'components/atoms';
import { OrderService } from 'services';
import { isValidWithoutData } from 'clients';
import { useRouter } from 'next/router';
import { CART_URL } from 'constants/Paths';
import EditOrderModal from '../EditOrderModal';

const EditOrderButton = ({ orderNo }) => {
  const [val, setVal] = useState(false);
  const router = useRouter();
  const handleChangeVal = () => {
    setVal(!val);
  };
  const handleClickOk = async () => {
    const res = await OrderService.deleteOrder({ orderNo });
    if (!isValidWithoutData(res)) {
      return;
    }
    router.push(CART_URL);
  };
  return (
    <>
      <Button className="my-order__button my-order__button--green" onClick={handleChangeVal}>
        Sửa đơn hàng
      </Button>
      <EditOrderModal visible={val} onClose={handleChangeVal} onClickOk={handleClickOk} />
    </>
  );
};

export default React.memo(EditOrderButton);
