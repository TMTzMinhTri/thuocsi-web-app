import { Template, NavBar, Header, InfoContainer } from 'components';

import { Container, Box } from '@material-ui/core';

const MyAccount = ({ mostResearched = [] }) => {
  const title = 'Cập nhật thông tin – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <Box p={5}>
          <InfoContainer />
        </Box>
      </Container>
    </Template>
  );
};
export default MyAccount;
