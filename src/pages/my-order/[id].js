import { Template, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { OrderClient, doWithServerSide, isValid } from 'clients';
import { withLogin } from 'context';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [order, products] = await Promise.all([
      OrderClient.getOrderById(id),
      OrderClient.getProductByOrderId(id),
    ]);
    if (!isValid(order) || !isValid(products)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    return {
      props: {
        order: order.data,
        products: products.data,
      },
    };
  });
}

const MyOrder = ({ user, order, products = [] }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của bạn" name={user?.name}>
            <OrderDetailContainer order={order} products={products} user={user} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
