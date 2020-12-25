import { useState, useEffect } from 'react';
import { Template, NavBar, Header, OrderInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';
import { ENUM_ORDER_STATUS } from 'constants/Enums';

export async function getServerSideProps() {
  try {
    const [user, wallet, orders] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      CustomerClient.getOrder({ status: ENUM_ORDER_STATUS.ALL }),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        orders,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {
          name: '',
          phone: '',
          email: '',
        },
        wallet: {
          balance: 0,
          name: '',
        },
        orders: [
          {
            orderID: 197183,
            amount: 7,
            createdAt: '18/12/2020',
            deliveryAt: '23/12/2020',
            status: 'pending',
            total: 3024110,
          },
        ],
      },
    };
  }
}

const MyOrder = ({ mostResearched = [], wallet, orders: orderR }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const [orders, setOrders] = useState(orderR);
  const [orderStatus, setOrderStatus] = useState(ENUM_ORDER_STATUS.ALL);

  useEffect(() => {
    async function getOrders() {
      const ods = await CustomerClient.getOrder({ status: orderStatus });
      setOrders(ods);
    }
    getOrders();
  }, [orderStatus]);

  const handleSetOrderStatus = (newOrderStatus) => {
    setOrderStatus(newOrderStatus);
  };

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của bạn" wallet={wallet}>
            <OrderInfoFormContainer
              orders={orders}
              handleSetOrderStatus={handleSetOrderStatus}
              orderStatus={orderStatus}
            />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default MyOrder;
