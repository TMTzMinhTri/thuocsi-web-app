import { Template, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, OrderClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [wallet, order, products] = await Promise.all([
      CustomerClient.getWallet(),
      OrderClient.getOrderById(id),
      OrderClient.getProductByOrderId(id),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        order,
        products,
      },
    };
  });
}

const MyOrder = ({ wallet, order, products = [] }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của bạn" wallet={wallet}>
            <OrderDetailContainer order={order} products={products} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
