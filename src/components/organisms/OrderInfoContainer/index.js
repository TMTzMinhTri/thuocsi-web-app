import { Grid } from '@material-ui/core';
import { OrderInfoTabs } from 'components/mocules';
import { PATH_INFO_BILL } from 'constants/Paths';
import styles from './styles.module.css';

const OrderInfoContainer = ({ user, orders, status, bankInfo }) => (
  <Grid item container spacing={3}>
    <Grid item xs={12} key="order-info-1">
      <div className={styles.detail}>
        Xem thông tin xuất hoá đơn đỏ &nbsp;
        <a href={PATH_INFO_BILL}>tại đây</a>
      </div>
    </Grid>
    <Grid item xs={12} key="order-info-2">
      <OrderInfoTabs
        user={user}
        orders={orders}
        status={status}
        bankInfo={bankInfo}
      />
    </Grid>
  </Grid>
);

export default OrderInfoContainer;
