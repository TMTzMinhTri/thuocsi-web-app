import { Template, NavBar, Header, PromoList, InfoContainer, HeaderMobile } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';

export async function getServerSideProps() {
  try {
    const [user, wallet, promos] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      CustomerClient.getPromo(),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        promos,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {
          name: '',
          phone: '',
          email: '',
        },
        wallet: {
          balance: 0,
          name: '',
        },
      },
    };
  }
}

const MyReferral = ({ mostResearched = [], wallet, promos = [], isMobile }) => {
  const title = 'Mã giảm giá của tôi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
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
          <InfoContainer value={4} title="Mã giảm giá của tôi" wallet={wallet}>
            <PromoList promos={promos} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default MyReferral;
