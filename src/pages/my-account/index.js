import Template from 'components/layout/Template';
import { AccountInfoFormContainer, InfoContainer } from 'components/organisms';
import { Container } from '@material-ui/core';
import { doWithServerSide } from 'services';
import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {},
  }));
}

const MyAccount = ({ user, isMobile }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={1} title="Cập nhật hồ sơ" point={user?.point} name={user?.name}>
            <AccountInfoFormContainer user={user} />
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(MyAccount);
