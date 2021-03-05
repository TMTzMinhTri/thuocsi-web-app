import { Template, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { OrderClient, isValid, isValidWithoutData } from 'clients';
import { doWithServerSide } from 'services';
import { withLogin } from 'HOC';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [orderRes] = await Promise.all([OrderClient.getOrderById({ id: Number(id), ctx })]);
    if (!isValid(orderRes)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    const order = orderRes.data[0] || {};
    const { orderNo = '' } = order;
    const productsRes = await OrderClient.getProductByOrderNo({ orderNo, ctx });
    if (!isValidWithoutData(productsRes)) {
      return {
        props: {
          order,
          products: [],
        },
      };
    }

    const products = productsRes.data || [];

    const orderItemInfoRes = await OrderClient.getInfoOrderItem({ orderItems: products, ctx });
    if (!isValid(orderItemInfoRes)) {
      return {
        props: {
          order,
          products,
        },
      };
    }
    const orderItemInfoMap = orderItemInfoRes.data[0];
    const productDetails = products.map((product) => ({
      productInfo: orderItemInfoMap[product?.productSku] || {},
      ...product,
    }));
    return {
      props: {
        order,
        products: productDetails,
      },
    };
  });
}

const MyOrder = ({ user, order, products = [], isMobile }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const titleMobile = `Chi tiết đơn hàng #${order.orderId}`
  return (
    <Template title={title} isMobile={isMobile} pageTitle={titleMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={2} name={user?.name}>
            <OrderDetailContainer isMobile={isMobile} order={order} products={products} user={user} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
