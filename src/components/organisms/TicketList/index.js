import { Grid } from '@material-ui/core';
import TicketTable from './TicketTable';

const TicketList = ({ tickets, user }) => (
  <Grid item container spacing={3}>
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <TicketTable tickets={tickets} user={user} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default TicketList;
