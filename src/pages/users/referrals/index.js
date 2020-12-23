import { Template, NavBar, Header, ReferralList, InfoContainer } from 'components';
import { Container } from '@material-ui/core';

const MyAccount = ({ mostResearched = [] }) => {
  const title = 'Giới thiệu bạn bè – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={3} title="Giới thiệu bạn bè">
          <ReferralList />
        </InfoContainer>
      </Container>
    </Template>
  );
};
export default MyAccount;
