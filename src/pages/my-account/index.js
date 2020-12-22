import { Template, NavBar, Header, AccountInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient } from 'clients';

export async function getServerSideProps() {
  try {
    const [user] = AuthClient.getUser();
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
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
      },
    };
  }
}

const MyAccount = ({ mostResearched = [], user }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={1} title="Cập nhật hồ sơ">
          <AccountInfoFormContainer user={user} />
        </InfoContainer>
      </Container>
    </Template>
  );
};

export default MyAccount;
