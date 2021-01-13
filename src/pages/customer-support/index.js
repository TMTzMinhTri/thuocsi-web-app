import { Template, CustomerSupportContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';

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
