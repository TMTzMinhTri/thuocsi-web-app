import {
  Template,
  NavBar,
  Header,
  AccountInfoFormContainer,
  InfoContainer,
  HeaderMobile,
} from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [wallet] = await Promise.all([CustomerClient.getWallet()]);
    return {
      props: {
        wallet: wallet.data[0],
      },
    };
  });
}

const MyAccount = ({ mostResearched = [], user, wallet, isMobile }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <HeaderMobile title="Hoạt chất" /> : <Header />}
      {!isMobile && (
        <NavBar
          mostResearched={mostResearched}
          point={wallet.loyaltyPoint}
          balance={wallet.balance}
        />
      )}
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={1} title="Cập nhật hồ sơ" wallet={wallet}>
            <AccountInfoFormContainer user={user} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(MyAccount);
