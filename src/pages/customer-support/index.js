import { Template, CustomerSupportContainer } from 'components';
import { Container } from '@material-ui/core';

const CustomerSupport = () => {
  const title = 'Hỗ trợ khách hàng – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <CustomerSupportContainer />
        </Container>
      </div>
    </Template>
  );
};

export default CustomerSupport;
