import Template from 'components/layout/Template';
import InfoContainer from 'components/organisms/InfoContainer';
import { Container, Grid } from '@material-ui/core';
import { doWithServerSide } from 'clients';
import { withLogin } from 'HOC';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({}));
}

const MyLoyaltyPoint = ({ user, isMobile }) => {
  const title = 'Điểm tích luỹ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={5} title="Điểm tích luỹ" name={user?.name}>
            <Grid item xs={12} className={styles.loyalty_point_row}>
              Bạn đang có <span className={styles.point}>{user?.point}</span> điểm tích lũy.
            </Grid>
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyLoyaltyPoint);
