import { Grid } from '@material-ui/core';
import { OrderInfoTabs } from 'components/mocules';
import styles from './styles.module.css';

const OrderInfoContainer = () => (
  <Grid container>
    <Grid item xs={12}>
      <div className={styles.title}> Đơn hàng của tôi</div>
    </Grid>
    <OrderInfoTabs />
  </Grid>
);

export default OrderInfoContainer;
