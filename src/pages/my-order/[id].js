import { Template, NavBar, Header, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, OrderClient, doWithServerSide } from 'clients';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [wallet, order] = await Promise.all([
      CustomerClient.getWallet(),
      OrderClient.getOrderById(id),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        order,
      },
    };
  });
}

const MyOrder = ({ mostResearched = [], wallet, order }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <Header />
      <NavBar
        mostResearched={mostResearched}
        point={wallet.loyaltyPoint}
        balance={wallet.balance}
      />
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
