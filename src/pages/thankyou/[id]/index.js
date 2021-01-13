import { Template, ThankYouContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, OrderClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.query;
    return doWithServerSide(ctx, async () => {
      const [wallet, order] = await Promise.all([
        CustomerClient.getWallet(),
        OrderClient.getOrderById(id),
      ]);
      return {
        props: {
          wallet: wallet?.data[0],
          order,
        },
      };
    });
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}

const MyOrder = ({ order, isMobile }) => {
  const title = 'Cảm ơn bạn đã đặt hàng tại thuocsi.vn!';

  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer orderID={order.orderID} deliveryAt={order.deliveryAt} />
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyOrder);
