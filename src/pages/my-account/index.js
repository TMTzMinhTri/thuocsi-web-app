import { Template, AccountInfoFormContainer, InfoContainer } from 'components';
import { Container } from '@material-ui/core';
import { doWithServerSide } from 'services';
import { withLogin } from 'HOC';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      ...(await serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES)),
    },
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
