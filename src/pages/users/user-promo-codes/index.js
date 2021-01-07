import { Template, NavBar, Header, PromoList, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [wallet, promos] = await Promise.all([
      CustomerClient.getWallet(),
      CustomerClient.getPromo(),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        promos,
      },
    };
  });
}

const MyReferral = ({ mostResearched = [], wallet, promos = [] }) => {
  const title = 'Mã giảm giá của tôi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar
        mostResearched={mostResearched}
        point={wallet.loyaltyPoint}
        balance={wallet.balance}
      />
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={4} title="Mã giảm giá của tôi" wallet={wallet}>
            <PromoList promos={promos} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default MyReferral;
