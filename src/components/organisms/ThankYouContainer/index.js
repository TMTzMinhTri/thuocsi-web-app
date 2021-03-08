import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import Link from 'next/link';
import { Typography, Grid, Button } from '@material-ui/core';
import { EditOrderButton } from 'components/mocules';
import { DateTimeUtils } from 'utils';
import Router from 'next/router';
import { MY_ORDER_URL } from 'constants/Paths';
import styles from './styles.module.css';

const WatchOrderButton = ({ handleClick }) => (
  <Button className={styles.watch_order_button} onClick={handleClick}>
    Xem Đơn Hàng
  </Button>
);

const ThankYouContainer = ({ orderID = 0, orderNo, deliveryDate }) => {
  const handleWatchOrder = () => {
    Router.push(`${MY_ORDER_URL}/${orderID}`);
  };
  const deliveryDateStr = DateTimeUtils.getFormattedWithDate(new Date(deliveryDate || new Date()));
  return (
    <Grid container spacing={2} className={styles.container} direction="column">
      <Grid className={styles.icon}>
        <CheckCircleOutlineIcon className={styles.icon} />
      </Grid>
      <Typography variant="h5" className={styles.title}>
        Cảm ơn bạn đã đặt hàng tại thuocsi.vn!
      </Typography>
      <Grid item>
        Dự kiến giao vào
        <strong>{deliveryDateStr} </strong>
      </Grid>

      <Grid item>
        Đơn hàng sẽ được xác nhận bằng tin nhắn trong vòng 60 phút.
        <br />
        Để xuất đơn đỏ, vui lòng vào trang
        <Link href={MY_ORDER_URL}> Đơn hàng của tôi </Link>
        và nhấn vào nút "Xuất hoá đơn".
      </Grid>
      <Grid item className={styles.note} container justify="center" alignItems="center">
        <ErrorIcon /> &nbsp; Quý khách sẽ có 30 phút để chỉnh sửa giỏ hàng, bỏ bớt sản phẩm trong
        vòng 2 tiếng và được hỗ trợ huỷ đơn hàng trong vòng 12 tiếng sau khi đặt hàng
      </Grid>
      <Grid item container justify="center">
        <EditOrderButton orderNo={orderNo} />
        <WatchOrderButton handleClick={handleWatchOrder} />
      </Grid>
    </Grid>
  );
};

export default ThankYouContainer;
