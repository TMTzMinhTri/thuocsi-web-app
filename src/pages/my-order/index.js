import Template from 'components/layout/Template';
import OrderInfoContainer from 'components/organisms/OrderInfoContainer';
import InfoContainer from 'components/organisms/InfoContainer';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { Container } from '@material-ui/core';
import { OrderClient, CustomerClient, isValid } from 'clients';
import { doWithServerSide } from 'services';

import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  const { status = ENUM_ORDER_STATUS.ALL } = ctx.query;

  return doWithServerSide(ctx, async () => {
    const [ordersRes,bankData] = await Promise.all([OrderClient.getOrders({ status, ctx }), CustomerClient.getBankAccount(ctx)]);
    if (!isValid(ordersRes)) {
      return {
        props: {
          status,
        },
      };
    }
    const { data } = ordersRes;
    const bankInfo = bankData[0] || null;
    const orders =
      status !== ENUM_ORDER_STATUS.ALL ? data.filter((order) => order.status === status) : data;
    return {
      props: {
        orders,
        status,
        bankInfo
      },
    };
  });
}

const MyOrder = ({ user, isMobile, orders = [], status, bankInfo }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile} pageTitle="Đơn hàng của tôi">
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer isMobile={isMobile} value={2} title="Đơn hàng của tôi" name={user?.name}>
            <OrderInfoContainer user={user} orders={orders} status={status} bankInfo={bankInfo} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
