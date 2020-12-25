import { Paper, Grid } from '@material-ui/core';
import { ResponseButton, PrintInvoiceButton } from 'components/atoms';
import { OrderDetailStep, OrderDetailInfo, OrderDetailProduct } from 'components/mocules';
import { DateTimeUtils } from 'utils';
import styles from './styles.module.css';

const OrderDetailContainer = ({ order }) => (
  <Grid container>
    <Grid item xs={12}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <h3 className={styles.title}> Chi tiết đơn hàng #{order.orderID} </h3>
          </Grid>
          <Grid item xs={12}>
            <OrderDetailStep activeStep={order?.activeStep} />
          </Grid>
          <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
            <Grid container justify="center" direction="column">
              <div className={styles.order_status_bottom_text}>
                Dự kiến giao vào &nbsp;
                <span>{DateTimeUtils.getFormattedWithDate(new Date(order.deliveryAt))}</span>
              </div>
            </Grid>
            <ResponseButton />
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item className={styles.print_invoice}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton />
          </Grid>

          <Grid item container direction="column" justify="center" xs={5}>
            <div className={styles.text_danger}>
              Đơn hàng của bạn đã quá thời gian để xuất hóa đơn
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item xs={12}>
      <OrderDetailInfo {...order} />
    </Grid>

    <Grid item xs={12}>
      <OrderDetailProduct products={order?.products} promo={order?.promo} />
    </Grid>
  </Grid>
);

export default OrderDetailContainer;
