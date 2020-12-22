import { Template, NavBar, Header, AccountInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { AuthClient } from 'clients';

export async function getServerSideProps() {
  const user = await Promise.all([AuthClient.getUser()]);
  console.log(user);
  return {
    props: {
      user,
    },
  };
}

const MyAccount = ({ mostResearched = [], user }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  console.log(user);
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={1} title="Cập nhật hồ sơ">
          <AccountInfoFormContainer />
        </InfoContainer>
      </Container>
    </Template>
  );
};

export default MyAccount;
