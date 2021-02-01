import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import PromoList from 'components/organisms/PromoList';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';
import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [promos] = await Promise.all([CustomerClient.getPromo()]);
    return {
      props: {
        promos,
      },
    };
  });
}

const MyReferral = ({ user, promos = [], isMobile }) => {
  const title = 'Mã giảm giá của tôi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={4} title="Mã giảm giá của tôi" name={user?.name}>
            <PromoList promos={promos} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyReferral);
