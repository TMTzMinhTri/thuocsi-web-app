import { Template, NavBar, Header, ThankYouContainer, HeaderMobile } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, OrderClient, doWithServerSide } from 'clients';

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

const MyOrder = ({ mostResearched = [], wallet, order, isMobile }) => {
  const title = 'Cảm ơn bạn đã đặt hàng tại thuocsi.vn!';

  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <HeaderMobile title="Mã giảm giá" /> : <Header />}
      {!isMobile
      && (
      <NavBar
        mostResearched={mostResearched}
        point={wallet.loyaltyPoint}
        balance={wallet.balance}
      />
      )}
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <ThankYouContainer orderID={order.orderID} deliveryAt={order.deliveryAt} />
        </Container>
      </div>
    </Template>
  );
};
export default MyOrder;
