import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import ReferralList from 'components/organisms/ReferralList';
import { Container } from '@material-ui/core';
import { doWithServerSide } from 'services';

import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {},
  }));
}

const MyReferral = ({ user, isMobile }) => {
  const title = 'Giới thiệu bạn bè – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={3} title="Giới thiệu bạn bè" name={user?.name}>
            <ReferralList />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyReferral);
