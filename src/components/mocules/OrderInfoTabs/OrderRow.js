import { Grid, Paper, Button, useMediaQuery } from '@material-ui/core';
import { DateTimeUtils, FormarCurrency } from 'utils';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import Link from 'next/link';
import PrintInvoiceButton from '../PrintInvoiceButton';
import EditOrderButton from '../EditOrderButton';
import ResponseButton from '../ResponseButton';
import styles from './styles.module.css';

const parseOrderStatus = (status) => {
  if (ENUM_ORDER_STATUS.PENDING === status) return 'Chờ xác nhận';
  if (ENUM_ORDER_STATUS.COMPLETED === status) return 'Đã xác nhận';
  if (ENUM_ORDER_STATUS.CANCEL === status) return 'Đã huỷ';
  return '';
};

const MyOrderDetail = ({ amount, createdAt, deliveryAt }) => (
  <div>
    <div>
      <span className={styles.order_detail_label}>Sản phẩm: </span> {amount}
    </div>
    <div>
      <span className={styles.order_detail_label}>Ngày mua: </span>
      {DateTimeUtils.getFormattedDate(new Date(createdAt), 'DD/MM/YYYY HH:mm:ss')}
    </div>
    <div>
      <span className={styles.order_detail_label}> Dự kiến giao ngày: </span>
      {DateTimeUtils.getFormattedWithDate(new Date(deliveryAt))}
    </div>
  </div>
);
const OrderRow = ({ orderID, amount, createdAt, deliveryAt, status, total }) => {
  const maxWidth = useMediaQuery('(max-width:715px)');
  return (
    <Paper square={!maxWidth} className={styles.paper} elevation={0}>
      <Grid container spacing={4}>
        <Grid item xs={maxWidth ? 12 : 5} container direction="row" justify={maxWidth ? 'space-between' : 'end'}>
          <Grid item>
            <Link href={`/my-order/${orderID}`} key={`order-row-${orderID}`}>
              <h4 className={styles.order_id}>#{orderID} &nbsp;</h4>
            </Link>
          </Grid>
          <Grid item style={{ paddingTop: '5px' }}>
            <Button color="default" variant="contained" className={styles.status_button}>
              {parseOrderStatus(status)}
            </Button>
          </Grid>
          {maxWidth ? null : (
            <MyOrderDetail amount={amount} createdAt={createdAt} deliveryAt={deliveryAt} />
          )}
        </Grid>

        <Grid item xs={maxWidth ? 12 : 3} container direction="row" justify="space-between" className={styles.detail_small_screen}>
          {maxWidth ? (
            <Grid className={styles.delivery_date} item>
              {DateTimeUtils.getFormattedDate(new Date(createdAt), 'DD/MM/YYYY HH:mm:ss')}
            </Grid>
          ) : null}
          <Grid className={maxWidth ? styles.price_small_screen : styles.price} item>
            {FormarCurrency(total)}
          </Grid>
        </Grid>

        <Grid
          item
          xs={maxWidth ? 12 : 4}
          container
          direction={maxWidth ? 'row' : 'column'}
          justify="center"
        >
          <Grid item>
            <PrintInvoiceButton />
          </Grid>
          {status === ENUM_ORDER_STATUS.PENDING && (
            <Grid item>
              <EditOrderButton />
            </Grid>
          )}
          <Grid item>
            <ResponseButton />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderRow;
