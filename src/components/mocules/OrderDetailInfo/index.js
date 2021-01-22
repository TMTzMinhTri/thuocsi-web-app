import { Paper, Grid, makeStyles, Typography } from '@material-ui/core';
import { PAYMENT_METHOD } from 'constants/Enums';
import styles from './styles.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const MappingPaymentMethod = {
  [PAYMENT_METHOD.COD]: 'COD',
  [PAYMENT_METHOD.ChuyenKhoan]: 'Chuyển Khoản',
};

const OrderDetailInfo = ({ name, address, email, phone, ...order }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper className={classes.paper} elevation={3} classes={{ root: styles.info_left_paper }}>
            <Typography variant="h5" className={styles.info_label}>
              Tên người nhận
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {name}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {address}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Số điện thoại
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {phone}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Email
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {email}
            </Typography>
          </Paper>
        </Grid>

        <Grid
          item
          xs={7}
          container
          spacing={2}
          direction="column"
          className={styles.info_container}
        >
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Hình thức thanh toán:
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {MappingPaymentMethod[order.paymentMethod] || '(Chưa có)'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Đơn vị vận chuyển:&nbsp; <span>{order.deliveryPlatform || '(Chưa có)'} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Ngày giao:&nbsp; <span>{order.deliveryDate || '(Chưa có)'} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Mã vận đơn:&nbsp; <span>{order.deliveryTrackingNumber || '(Chưa có)'} </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Ghi chú:
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {order.note || '(Chưa có)'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetailInfo;
