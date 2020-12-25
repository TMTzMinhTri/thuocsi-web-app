import { Grid, Paper, Button } from '@material-ui/core';
import { DateTimeUtils, FormarCurrency } from 'utils';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { PrintInvoiceButton, EditOrderButton, ResponseButton } from 'components/atoms';
import Link from 'next/link';
import styles from './styles.module.css';

const parseOrderStatus = (status) => {
  if (ENUM_ORDER_STATUS.PENDING === status) return 'Chờ xác nhận';
  if (ENUM_ORDER_STATUS.COMPLETED === status) return 'Đã xác nhận';
  if (ENUM_ORDER_STATUS.CANCEL === status) return 'Đã huỷ';
  return '';
};

const OrderRow = ({ orderID, amount, createdAt, deliveryAt, status, total }) => (
  <Paper square className={styles.paper} elevation={4}>
    <Grid container spacing={4}>
      <Grid item xs={5}>
        <div>
          <Link href={`/my-order/${orderID}`} key={`order-row-${orderID}`}>
            <h4 className={styles.order_id}>#{orderID} &nbsp; &nbsp;</h4>
          </Link>
          <Button color="default" variant="contained">
            {parseOrderStatus(status)}
          </Button>
        </div>
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
      </Grid>

      <Grid item xs={3}>
        <div className={styles.price}> {FormarCurrency(total)}</div>
      </Grid>

      <Grid item xs={3}>
        <PrintInvoiceButton />
        <EditOrderButton />
        <ResponseButton />
      </Grid>
    </Grid>
  </Paper>
);

export default OrderRow;
