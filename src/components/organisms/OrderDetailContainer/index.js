import { Paper, Grid } from '@material-ui/core';
import {
  OrderDetailStep,
  OrderDetailInfo,
  OrderDetailProduct,
  TicketButton,
  PrintInvoiceButton,
  EditOrderButton,
} from 'components/mocules';
import { PATH_INFO_BILL, MY_ORDER_URL } from 'constants/Paths';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import Link from 'next/link';
import styles from './styles.module.css';

const OrderDetailContainer = ({ order, products, user, isMobile }) => (
  <Grid container>
    <Grid item xs={12}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container>
          {!isMobile && (
            <Grid item xs={12}>
              <h3 className={styles.title}> Chi tiết đơn hàng #{order.orderId} </h3>
            </Grid>
          )}
          <Grid item xs={12}>
            <OrderDetailStep status={order?.status} />
          </Grid>
          <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
            <Grid container justify="center" direction="column">
              <div className={styles.order_status_bottom_text}>
                Dự kiến giao vào &nbsp;
                <span>
                  {DateTimeUtils.getFormattedWithDate(new Date(order.deliveryDate || Date.now()))}
                </span>
              </div>
            </Grid>
            <Grid className={styles.order_button} item container direction="row" justify="flex-end">
              <EditOrderButton orderNo={order.orderNo} />
              <TicketButton
                orderID={order.orderID}
                orderNo={order.orderNo}
                orderTime={order.createdTime}
                name={order?.customerName}
                phone={order?.customerPhone}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item className={styles.print_invoice}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid className={styles.print_invoice_button} container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton
              orderNo={order.orderNo}
              user={user}
              disabled={order.status !== ENUM_ORDER_STATUS.PENDING}
            />
          </Grid>

          <Grid item container direction="column" justify="center" xs={5}>
            {order.status === ENUM_ORDER_STATUS.CANCEL ||
            order.status === ENUM_ORDER_STATUS.COMPLETED ? (
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
      <OrderDetailInfo {...order} />
    </Grid>

    <Grid className={styles.table_wrapper} item xs={12}>
      <OrderDetailProduct
        products={products}
        promoName={order?.redeemCode}
        totalDiscount={order?.totalDiscount}
      />
    </Grid>
    <Grid item xs={12} className={styles.comeback}>
      <Link href={MY_ORDER_URL}> &lt;&lt; Quay lại đơn hàng của tôi </Link>
    </Grid>
  </Grid>
);

export default OrderDetailContainer;
