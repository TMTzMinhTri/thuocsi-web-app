import { useState, useEffect } from 'react';
import Template from 'components/layout/Template';
import OrderInfoContainer from 'components/organisms/OrderInfoContainer';
import InfoContainer from 'components/organisms/InfoContainer';

import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide, isValid } from 'clients';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { NOT_FOUND_URL } from 'constants/Paths';
import { withLogin } from 'context';
import { NotifyUtils } from 'utils';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [orders] = await Promise.all([
      CustomerClient.getOrder({ status: ENUM_ORDER_STATUS.ALL }),
    ]);
    if (!isValid(orders)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    return {
      props: {
        orders: orders.data,
      },
    };
  });
}

const MyOrder = ({ user, orders: orderR = [], isMobile }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [orders, setOrders] = useState(orderR);
  const [orderStatus, setOrderStatus] = useState(ENUM_ORDER_STATUS.ALL);
  useEffect(() => {
    async function getOrders() {
      try {
        const ods = await CustomerClient.getOrder({ status: orderStatus });
        if (!isValid(ods)) throw Error('Lấy danh sách đơn hàng thất bại');
        setOrders(ods.data);
      } catch (error) {
        NotifyUtils.error(error?.message || 'Lấy dữ liệu thất bại');
      }
    }
    getOrders();
  }, [orderStatus]);

  const handleSetOrderStatus = (newOrderStatus) => {
    setOrderStatus(newOrderStatus);
  };

  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của tôi" name={user?.name}>
            <OrderInfoContainer
              orders={orders}
              handleSetOrderStatus={handleSetOrderStatus}
              orderStatus={orderStatus}
              user={user}
            />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
