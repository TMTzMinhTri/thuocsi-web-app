import Template from 'components/layout/Template';
import { OrderDetailContainer, InfoContainer } from 'components/organisms';
import { Container } from '@material-ui/core';
import { isValid, CustomerClient, TicketClient, getData, getFirst } from 'clients';
import { doWithServerSide, OrderService } from 'services';
import { withLogin } from 'HOC';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [orderRes, bankData, reasonsRes] = await Promise.all([
      OrderService.getOrderDetail({ orderId: Number(id), ctx }),
      CustomerClient.getBankAccount(ctx),
      TicketClient.getListReasons(ctx),
    ]);

    if (!isValid(orderRes)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }

    const order = getFirst(orderRes, {});
    const bankInfo = bankData[0] || null;
    const reasonsList = getData(reasonsRes);

    return {
      props: {
        order,
        bankInfo,
        reasonsList,
      },
    };
  });
}

const MyOrder = ({ user, order, isMobile, bankInfo, reasonsList }) => {
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
