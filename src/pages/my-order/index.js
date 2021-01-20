import { useState, useEffect } from 'react';
import { Template, OrderInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [orders] = await Promise.all([
      CustomerClient.getOrder({ status: ENUM_ORDER_STATUS.ALL }),
    ]);
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
      const ods = await CustomerClient.getOrder({ status: orderStatus });
      setOrders(ods.data);
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
            <OrderInfoFormContainer
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
