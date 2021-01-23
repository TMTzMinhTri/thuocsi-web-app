import { Paper, Grid } from '@material-ui/core';
import {
  OrderDetailStep,
  OrderDetailInfo,
  OrderDetailProduct,
  ResponseButton,
  PrintInvoiceButton,
} from 'components/mocules';
import { PATH_INFO_BILL } from 'constants/Paths';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import styles from './styles.module.css';

const OrderDetailContainer = ({ order, products, user }) => (
  <Grid container>
    <Grid item xs={12}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <h3 className={styles.title}> Chi tiết đơn hàng #{order.orderNo} </h3>
          </Grid>
          <Grid item xs={12}>
            <OrderDetailStep status={order?.status} />
          </Grid>
          <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
            <Grid container justify="center" direction="column">
              <div className={styles.order_status_bottom_text}>
                Dự kiến giao vào &nbsp;
                <span>{DateTimeUtils.getFormattedWithDate(new Date(order.deliveryDate))}</span>
              </div>
            </Grid>
            <ResponseButton orderID={order.orderNo} name={user?.name} phone={user?.phone} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item className={styles.print_invoice}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton orderID={order.orderNo} user={user} />
          </Grid>

          <Grid item container direction="column" justify="center" xs={5}>
            {order.status === ENUM_ORDER_STATUS.CANCEL
            || order.status === ENUM_ORDER_STATUS.COMPLETED ? (
              <div className={styles.text_danger}>
                Đơn hàng của bạn đã quá thời gian để xuất hóa đơn
              </div>
              ) : (
                <div className={styles.text_bill}>
                  Xem thông tin xuất hoá đơn đỏ&nbsp;
                  <a href={PATH_INFO_BILL} target="_blank" rel="noreferrer">
                    tại đây
                  </a>
                </div>
              )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item xs={12}>
      <OrderDetailInfo
        {...order}
        name={user?.name}
        phone={user?.phone}
        address={user?.address}
        email={user?.email}
      />
    </Grid>

    <Grid item xs={12}>
      <OrderDetailProduct
        products={products}
        promoName={order?.redeemCode}
        totalDiscount={order?.totalDiscount}
      />
    </Grid>
  </Grid>
);

export default OrderDetailContainer;
