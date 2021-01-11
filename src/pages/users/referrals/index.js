import { Template, NavBar, Header, ReferralList, InfoContainer, HeaderMobile } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';

export async function getServerSideProps() {
  try {
    const [user, wallet, referrals] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      CustomerClient.getReferral(),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        referrals,
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

const MyReferral = ({ mostResearched = [], wallet, referrals = [], isMobile }) => {
  const title = 'Giới thiệu bạn bè – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <HeaderMobile title="Giới thiệu bạn bè" /> : <Header />}
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
          <InfoContainer value={3} title="Giới thiệu bạn bè" wallet={wallet}>
            <ReferralList referrals={referrals} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default MyReferral;
