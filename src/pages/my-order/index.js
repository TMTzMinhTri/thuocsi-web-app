import Template from 'components/layout/Template';
import OrderInfoContainer from 'components/organisms/OrderInfoContainer';
import InfoContainer from 'components/organisms/InfoContainer';
import { ENUM_ORDER_STATUS, DEFAULT_PAGINATION } from 'constants/Enums';
import { Container } from '@material-ui/core';
import { OrderClient, isValidWithoutData } from 'clients';
import { doWithServerSide } from 'services';

import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  let { status } = ctx.query;
  return doWithServerSide(ctx, async () => {
    try {
      if (!status) status = ENUM_ORDER_STATUS.ALL;
      let [orders] = await Promise.all([
        OrderClient.getOrders({
          offset: DEFAULT_PAGINATION.OFFSET,
          limit: DEFAULT_PAGINATION.LIMIT,
          status: ENUM_ORDER_STATUS.ALL,
          ctx,
        }),
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
        props: {
          orders: [],
          status,
        },
      };
    }
  });
}

const MyOrder = ({ user, isMobile, orders, status }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile} pageTitle="Đơn hàng của tôi">
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={2} title="Đơn hàng của tôi" name={user?.name}>
            <OrderInfoContainer user={user} orders={orders} status={status} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
