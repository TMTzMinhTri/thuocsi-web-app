import React, { useState } from 'react';
import { Button } from 'components/atoms';
import { OrderService } from 'services';
import { isValidWithoutData } from 'clients';
import { useRouter } from 'next/router';
import { useCart } from 'context';
import { CART_URL } from 'constants/Paths';
import { NotifyUtils } from 'utils';
import EditOrderModal from '../EditOrderModal';

const EditOrderButton = ({ orderNo, canEdit }) => {
  const [val, setVal] = useState(false);
  const router = useRouter();
  const { updateCart } = useCart();
  const handleChangeVal = () => {
    setVal(!val);
  };
  const handleClickOk = async () => {
    const res = await OrderService.deleteOrder({ orderNo });
    if (!isValidWithoutData(res)) {
      NotifyUtils.error(res?.message || 'Đã có lỗi xảy ra, xin vui lòng thử lại sau');
      return;
    }
    updateCart();
    router.push(CART_URL);
  };

  // const classNameBtn = canEdit ? "my-order__button my-order__button--green" : "my-order__button my-order__button--green"

  return (
    <>
      <Button
        className="my-order__button my-order__button--green"
        onClick={handleChangeVal}
        disabled={!canEdit}
      >
        Sửa đơn hàng
      </Button>
      <EditOrderModal visible={val} onClose={handleChangeVal} onClickOk={handleClickOk} />
    </>
  );
};

export default React.memo(EditOrderButton);
