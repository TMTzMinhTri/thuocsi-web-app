import Template from 'components/layout/Template';
import ThankYouContainer from 'components/organisms/ThankYouContainer';
import { Container } from '@material-ui/core';
import { OrderClient, isValid } from 'clients';
import { doWithServerSide } from 'services';

import { withLogin } from 'HOC';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [order] = await Promise.all([OrderClient.getOrderById({ id: Number(id), ctx })]);
    if (!isValid(order)) {
      return {
        redirect: {
          destination: NOT_FOUND_URL,
          permanent: false,
        },
      };
    }
    return {
      props: {
        order: order.data[0],
      },
    };
  });
}

const ThankYou = ({ order = {}, isMobile }) => {
  const title = 'Cảm ơn bạn đã đặt hàng tại thuocsi.vn!';
  const { orderId, deliveryDate, orderNo } = order;
  return (
    <Template title={title} isMobile={isMobile} pageTitle="Đặt hàng thành công">
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer orderID={orderId} orderNo={orderNo} deliveryDate={deliveryDate} />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ThankYou);
