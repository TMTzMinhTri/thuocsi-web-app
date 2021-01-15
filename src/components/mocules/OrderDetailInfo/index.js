import { Paper, Grid, makeStyles, Typography } from '@material-ui/core';
import styles from './styles.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const OrderDetailInfo = ({ name, address, email, phone, order = {} }) => {
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
                Hình thức thanh toán
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {order.payment || '(Chưa có)'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Đơn vị vận chuyển: {order.delivery || '(Chưa có)'}
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Ngày giao: {order.delivery_time || '(Chưa có)'}
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Mã vận đơn:{order.code || '(Chưa có)'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Hình thức thanh toán
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {order.payment || '(Chưa có)'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetailInfo;
