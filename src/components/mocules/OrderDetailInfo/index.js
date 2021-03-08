import React from 'react';
import { Paper, Grid, makeStyles, Typography } from '@material-ui/core';
import { i18n } from 'i18n-lib';
import styles from './styles.module.css';

const NOT_YET = '(Chưa có)';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const OrderDetailInfo = ({
  customerName,
  customerShippingAddress,
  customerEmail,
  customerPhone,
  t,
  note,
  paymentMethod,
  deliveryTrackingNumber,
  deliveryDate,
  deliveryPlatform,
}) => {
  const classes = useStyles();

  return (
    <div className={styles.info}>
      <Grid container spacing={2} className={styles.info_inner_grid}>
        <Grid item xs={5} className={styles.info_adress}>
          <Paper className={classes.paper} elevation={3} classes={{ root: styles.info_left_paper }}>
            <Typography variant="h5" className={styles.info_label}>
              Tên người nhận
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {customerName}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {customerShippingAddress}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Số điện thoại
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {customerPhone}
            </Typography>
            <Typography variant="h5" className={styles.info_label}>
              Email
            </Typography>
            <Typography variant="h6" className={styles.info_value}>
              {customerEmail}
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
                {t(`payment.method.${paymentMethod}`) || NOT_YET}
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Đơn vị vận chuyển:&nbsp;
                <span>{t(`delivery.method.${deliveryPlatform}`) || NOT_YET} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Ngày giao:&nbsp; <span>{deliveryDate || NOT_YET} </span>
              </Typography>
              <Typography variant="h5" className={styles.info_label}>
                Mã vận đơn:&nbsp; <span>{deliveryTrackingNumber || NOT_YET} </span>
              </Typography>
            </Paper>
          </Grid>
          <Grid item className={styles.info_container}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" className={styles.info_label}>
                Ghi chú:
              </Typography>
              <Typography variant="h6" className={styles.info_value}>
                {note || NOT_YET}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default i18n.withTranslation('common')(React.memo(OrderDetailInfo));
