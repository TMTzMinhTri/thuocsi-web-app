import { Template, NavBar, Header, InfoContainer } from 'components';
import { Container, Grid } from '@material-ui/core';
import { AuthClient, CustomerClient } from 'clients';
import styles from './styles.module.css';

export async function getServerSideProps() {
  try {
    const [user, wallet, referrals] = await Promise.all([
      AuthClient.getUser(),
      CustomerClient.getWallet(),
      CustomerClient.getReferral(),
    ]);
    if (!user) throw new Error('Cannot get user');
    return {
      props: {
        user: user.data[0],
        wallet: wallet.data[0],
        referrals,
      },
    };
  } catch (error) {
    return {
      props: {
        user: {
          name: '',
          phone: '',
          email: '',
        },
        wallet: {
          balance: 0,
          name: '',
        },
      },
    };
  }
}

const MyLoyaltyPoint = ({ mostResearched = [], wallet }) => {
  const title = 'Điểm tích luỹ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <Container maxWidth="lg">
        <InfoContainer value={5} title="Điểm tích luỹ" wallet={wallet}>
          <Grid item xs={12} className={styles.loyalty_point_row}>
            Bạn đang có <span className={styles.point}>{wallet.loyaltyPoint}</span> điểm tích lũy.
          </Grid>
        </InfoContainer>
      </Container>
    </Template>
  );
};
export default MyLoyaltyPoint;