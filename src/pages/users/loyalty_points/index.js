import { Template, InfoContainer } from 'components';
import { Container, Grid } from '@material-ui/core';
import { CustomerClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';
import styles from './styles.module.css';

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

const MyLoyaltyPoint = ({ wallet, isMobile }) => {
  const title = 'Điểm tích luỹ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ backgroundColor: '#f4f7fc' }}>
        <Container maxWidth="lg">
          <InfoContainer value={5} title="Điểm tích luỹ" wallet={wallet}>
            <Grid item xs={12} className={styles.loyalty_point_row}>
              Bạn đang có <span className={styles.point}>{wallet.loyaltyPoint}</span> điểm tích lũy.
            </Grid>
          </InfoContainer>
        </Container>
      </div>
    </Template>
  );
};
export default withLogin(MyLoyaltyPoint);
