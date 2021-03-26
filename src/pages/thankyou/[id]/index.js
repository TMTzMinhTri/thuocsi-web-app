import Template from 'components/layout/Template';
import ThankYouContainer from 'components/organisms/ThankYouContainer';
import { Container } from '@material-ui/core';
import { getFirst, isValid } from 'clients';
import { doWithServerSide, OrderService } from 'services';

import { withLogin } from 'HOC';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [orderRes] = await Promise.all([
      OrderService.getOrderDetail({ orderId: Number(id), ctx }),
    ]);
    if (!isValid(orderRes)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    return {
      props: {
        order: getFirst(orderRes),
      },
    };
  });
}

const ThankYou = ({ order = {}, isMobile }) => {
  const title = 'Cảm ơn bạn đã đặt hàng tại thuocsi.vn!';
  const { orderId, deliveryDate, orderNo, canEdit } = order;
  return (
    <Template title={title} isMobile={isMobile} pageTitle="Đặt hàng thành công">
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer
            orderID={orderId}
            orderNo={orderNo}
            deliveryDate={deliveryDate}
            canEdit={canEdit}
          />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ThankYou);
