import Template from 'components/layout/Template';
import OrderInfoContainer from 'components/organisms/OrderInfoContainer';
import InfoContainer from 'components/organisms/InfoContainer';
import { ENUM_ORDER_STATUS, DEFAULT_PAGINATION } from 'constants/Enums';
import { NOT_FOUND_URL } from 'constants/Paths';
import { Container } from '@material-ui/core';
import { doWithServerSide, OrderClient, isValidWithoutData } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    try {
      let { status } = ctx.query;
      if (!status) status = ENUM_ORDER_STATUS.ALL;
      let [orders] = await Promise.all([
        OrderClient.getOrders(
          DEFAULT_PAGINATION.OFFSET,
          DEFAULT_PAGINATION.LIMIT,
          ENUM_ORDER_STATUS.ALL,
          ctx,
        ),
      ]);
      if (!isValidWithoutData(orders)) throw Error(orders?.message);
      const ods = orders?.data || [];
      if (status !== ENUM_ORDER_STATUS.ALL) {
        orders = ods.filter((order) => order.status === status);
      } else {
        orders = ods;
      }
      return {
        props: {
          orders,
          status,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
  });
}

const MyOrder = ({ user, isMobile, orders, status }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={2} title="Đơn hàng của tôi" name={user?.name}>
            <OrderInfoContainer user={user} orders={orders} status={status} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
