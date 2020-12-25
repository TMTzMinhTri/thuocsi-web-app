import { Template, NavBar, Header, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient, OrderClient } from 'clients';

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.query;
    const [user, wallet, order] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      OrderClient.getOrderById(id),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        order,
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
        order: {},
      },
    };
  }
}

const MyOrder = ({ mostResearched = [], wallet, order }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của bạn" wallet={wallet}>
            <OrderDetailContainer order={order} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default MyOrder;
