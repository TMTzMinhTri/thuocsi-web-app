import { Input } from 'components/atoms';
import { Button, Grid } from '@material-ui/core';
import styles from './styles.module.css';
import ReferralTable from './ReferralTable';

const ReferralList = ({ referrals }) => (
  <Grid item container spacing={3}>
    <Grid item xs={12}>
      <Grid container spacing={3} direction="row">
        <Grid item xs={4}>
          <Input placeholder="Nhập số điện thoại bạn bè" className={styles.input} />
        </Grid>
        <Grid item className={styles.button_container}>
          <Button className={styles.button}> Gửi SMS giới thiệu </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <ReferralTable referrals={referrals} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default ReferralList;
