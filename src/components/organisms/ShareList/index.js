import { Input } from 'components/atoms';
import { Button, Grid } from '@material-ui/core';

const ShareList = () => (
  <Grid item>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Input />
        {/* <Button /> */}
      </Grid>
      <Grid item xs={12}>
        {/* <Input /> */}
        <Button />
      </Grid>
    </Grid>
  </Grid>
);

export default ShareList;
