import { Paper, Grid, Button, withStyles } from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import PrintIcon from '@material-ui/icons/Print';
import { OrderDetailStep, OrderDetailInfo, OrderDetailProduct } from 'components/mocules';
import styles from './styles.module.css';

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

const OrderDetailContainer = () => (
  <Grid container>
    <Grid item xs={12}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <h3 className={styles.title}> Chi tiết đơn hàng #197180 </h3>
          </Grid>
          <Grid item xs={12}>
            <OrderDetailStep />
          </Grid>
          <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
            <Grid container justify="center" direction="column">
              <div className={styles.order_status_bottom_text}>
                Dự kiến giao vào <span>Thứ tư (23/12/2020) </span>
              </div>
            </Grid>
            <ResponseButton startIcon={<InsertCommentIcon />}> Gửi phản hồi</ResponseButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>

    <Grid item>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton startIcon={<PrintIcon />}> Xuất hoá đơn</PrintInvoiceButton>
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
      <OrderDetailInfo />
    </Grid>

    <Grid item xs={12}>
      <OrderDetailProduct />
    </Grid>
  </Grid>
);

export default OrderDetailContainer;
