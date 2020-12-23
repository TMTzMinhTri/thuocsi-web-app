import { Grid } from '@material-ui/core';
import PromoTable from './PromoTable';

const PromoList = ({ promos }) => (
  <Grid item>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <PromoTable promos={promos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default PromoList;
