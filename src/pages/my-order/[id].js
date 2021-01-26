import { Template, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { OrderClient, doWithServerSide, isValid, isValidWithoutData } from 'clients';
import { withLogin } from 'context';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [order, products] = await Promise.all([
      OrderClient.getOrderById(id, ctx),
      OrderClient.getProductByOrderId(id, ctx),
    ]);
    if (!isValid(order) || !isValid(products)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }

    const mapProductInfo = await OrderClient.getInfoOrderItem({ orderItems: products.data, ctx });
    if (!isValidWithoutData(mapProductInfo)) {
      return {
        props: {
          order: order.data[0],
        products: products.data,
        },
      };
    }

    const prds = products?.data || [];
    const productDetails = prds.map((product) => ({
      productInfo: mapProductInfo[product?.productSku || ''] || {},
      ...product,
    }));
    return {
      props: {
        order: order.data[0],
        products: productDetails,
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
