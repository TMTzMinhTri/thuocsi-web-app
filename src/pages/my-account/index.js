import { Template, NavBar, Header, AccountInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';

export async function getServerSideProps() {
  try {
    const [user, wallet] = await Promise.all([AuthClient.getUser(), CustomerClient.getWallet()]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
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

const MyAccount = ({ mostResearched = [], user, wallet }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={1} title="Cập nhật hồ sơ" wallet={wallet}>
          <AccountInfoFormContainer user={user} />
        </InfoContainer>
      </Container>
    </Template>
  );
};

export default MyAccount;
