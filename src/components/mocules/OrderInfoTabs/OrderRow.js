import { Grid, Paper, Button, withStyles, makeStyles } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { DateTimeUtils, FormarCurrency } from 'utils';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import Link from 'next/link';
import styles from './styles.module.css';

const useStyles = makeStyles({
  indicator: {
    display: 'none',
  },
  root: {
    padding: '15px',
    marginBottom: '15px',
  },
});

const PrintInvoiceButton = withStyles({
  root: {
    color: ' #212529',
    border: '1px solid #f9b514',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    backgroundColor: '#f9b514',
    textTransform: 'none',
  },
})(Button);

const EditOrderButton = withStyles({
  root: {
    color: '#00b46e',
    border: '1px solid #00b46e',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    textTransform: 'none',
  },
})(Button);

const ResponseButton = withStyles({
  root: {
    color: '#17a2b8',
    border: '1px solid #17a2b8',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    textTransform: 'none',
  },
})(Button);

const parseOrderStatus = (status) => {
  if (ENUM_ORDER_STATUS.PENDING === status) return 'Chờ xác nhận';
  if (ENUM_ORDER_STATUS.COMPLETED === status) return 'Đã xác nhận';
  if (ENUM_ORDER_STATUS.CANCEL === status) return 'Đã huỷ';
  return '';
};

const OrderRow = ({ orderID, amount, createdAt, deliveryAt, status, total }) => {
  const classes = useStyles();

  return (
    <Paper square className={classes.root} elevation={4}>
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
            {DateTimeUtils.getFormattedWithDate(new Date(deliveryAt), 'd(DD/MM/YYYY)')}
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className={styles.price}> {FormarCurrency(total)}</div>
        </Grid>

        <Grid item xs={3}>
          <Grid>
            <PrintInvoiceButton startIcon={<PrintIcon />}> Xuất hoá đơn </PrintInvoiceButton>
          </Grid>
          <Grid>
            <EditOrderButton> Sửa đơn hàng </EditOrderButton>
          </Grid>
          <Grid>
            <ResponseButton startIcon={<InsertCommentIcon />}> Gửi phản hồi</ResponseButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderRow;
