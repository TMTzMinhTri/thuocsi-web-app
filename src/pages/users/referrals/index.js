import { Template, ReferralList, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [referrals] = await Promise.all([CustomerClient.getReferral()]);
    return {
      props: {
        referrals,
      },
    };
  });
}

const MyReferral = ({ user, referrals = [], isMobile }) => {
  const title = 'Giới thiệu bạn bè – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={3} title="Giới thiệu bạn bè" name={user?.name}>
            <ReferralList referrals={referrals} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyReferral);
