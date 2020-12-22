import { Template, NavBar, Header, OrderInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';

const MyAccount = ({ mostResearched = [] }) => {
  const title = 'Đơn hàng của bạn – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={2} title="Đơn hàng của bạn">
          <OrderInfoFormContainer />
        </InfoContainer>
      </Container>
    </Template>
  );
};
export default MyAccount;
