import { Template, OrderDetailContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { OrderClient, isValid, isValidWithoutData, CustomerClient, TicketClient, getData } from 'clients';
import { doWithServerSide } from 'services';
import { withLogin } from 'HOC';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [orderRes, bankData, reasonsRes] = await Promise.all([
      OrderClient.getOrderById({ id: Number(id), ctx }),
      CustomerClient.getBankAccount(ctx),
      TicketClient.getListReasons(ctx)
    ]);

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
    const bankInfo = bankData[0] || null;
    const reasonsList = getData(reasonsRes);
    const productsRes = await OrderClient.getProductByOrderNo({ orderNo, ctx });
    if (!isValidWithoutData(productsRes)) {
      return {
        props: {
          order,
          products: [],
          bankInfo,
          reasonsList
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
          bankInfo,
          reasonsList
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
        bankInfo,
        reasonsList
      },
    };
  });
}

const MyOrder = ({ user, order, products = [], isMobile, bankInfo, reasonsList }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const titleMobile = `Chi tiết đơn hàng #${order.orderId}`;
  return (
    <Template title={title} isMobile={isMobile} pageTitle={titleMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={2} name={user?.name}>
            <OrderDetailContainer
              isMobile={isMobile}
              order={order}
              products={products}
              user={user}
              bankInfo={bankInfo}
              reasonsList={reasonsList}
            />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
