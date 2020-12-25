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

const OrderDetailInfo = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper className={classes.paper} elevation={3} classes={{ root: styles.info_left_paper }}>
            <Typography variant="h5" className={styles.info_label}>
              Tên người nhận
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              lê duy đạt
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              abc, Thị trấn Vôi, Huyện Lạng Giang, Bắc Giang
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Số điện thoại
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              0963649542
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Email
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              dat.le@thuocsi.vn
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
                Thanh toán tiền mặt khi nhận hàng
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Đơn vị vận chuyển:
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Ngày giao:
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Mã vận đơn:
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Hình thức thanh toán
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                Thanh toán tiền mặt khi nhận hàng
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetailInfo;
