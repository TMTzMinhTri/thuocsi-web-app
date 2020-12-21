import { Grid } from '@material-ui/core';
import { AccountForm, EnterpriseForm, DeliveryForm } from 'components/mocules';
import styles from './styles.module.css';

const AccountInfoFormContainer = ({ value }) => (
  <Grid
    container
    direction="column"
    value={value}
    spacing={4}
    id="vertical-tabpanel-0"
    aria-labelledby="vertical-tab-0"
  >
    <Grid item xs={12} justify="center">
      <div className={styles.title}>Cập nhật hồ sơ</div>
    </Grid>
    <Grid item xs={12}>
      <AccountForm />
    </Grid>
    <Grid item xs={12}>
      <EnterpriseForm />
    </Grid>
    <Grid item xs={12}>
      <DeliveryForm />
    </Grid>
  </Grid>
);

export default AccountInfoFormContainer;
