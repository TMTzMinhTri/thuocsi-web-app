import { Grid } from '@material-ui/core';
import { AccountForm, EnterpriseForm, DeliveryForm } from 'components/mocules';
import UpdateButton from './UpdateButton';

const AccountInfoFormContainer = () => (
  <Grid item>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AccountForm />
      </Grid>
      <Grid item xs={12}>
        <EnterpriseForm />
      </Grid>
      <Grid item xs={12}>
        <DeliveryForm />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <UpdateButton />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default AccountInfoFormContainer;
