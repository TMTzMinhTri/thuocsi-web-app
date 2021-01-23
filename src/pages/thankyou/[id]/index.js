import Template from 'components/layout/Template';
import ThankYouContainer from 'components/organisms/ThankYouContainer';
import { Container } from '@material-ui/core';
import { OrderClient, doWithServerSide, isValid } from 'clients';
import { withLogin } from 'context';
import { NOT_FOUND_URL } from 'constants/Paths';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [order] = await Promise.all([OrderClient.getOrderById(ctx, id)]);
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
  const { orderNo, createdTime } = order;
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer orderID={orderNo} deliveryAt={createdTime} />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(ThankYou);
