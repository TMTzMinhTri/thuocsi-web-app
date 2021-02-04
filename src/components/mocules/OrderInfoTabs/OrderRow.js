import { useState, useEffect } from 'react';
import { Grid, Paper, useMediaQuery } from '@material-ui/core';
import { DateTimeUtils, NotifyUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { OrderClient, isValid } from 'clients';
import Link from 'next/link';
import { MY_ORDER_URL } from 'constants/Paths';
import PrintInvoiceButton from '../PrintInvoiceButton';
import EditOrderButton from '../EditOrderButton';
import ResponseButton from '../ResponseButton';
import styles from './styles.module.css';
import OrderStatusButton from './OrderStatusButton';

const MyOrderDetail = ({ amount, createdTime, deliveryDate }) => (
  <Grid item xs={12}>
    <div>
      <span className={styles.order_detail_label}>Sản phẩm: </span> {amount}
    </div>
    <div>
      <span className={styles.order_detail_label}>Ngày mua: </span>
      {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm:ss')}
    </div>
    <div>
      <span className={styles.order_detail_label}> Dự kiến giao ngày: </span>
      {DateTimeUtils.getFormattedWithDate(new Date(deliveryDate || Date.now()))}
    </div>
  </Grid>
);
const OrderRow = ({
  orderId: orderID,
  orderNo,
  createdTime,
  deliveryDate,
  status,
  totalPrice,
  user,
  handleSetOrderStatus,
}) => {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        // will change in future
        const res = await OrderClient.getProductByOrderNo({ orderNo });
        if (!isValid(res)) throw Error('Lấy danh sách sản phẩm không thành công');
        const quantity = res.data.reduce(
          (accumulator, currentValue) => accumulator + (currentValue?.quantity || 0),
          0,
        );
        setAmount(quantity);
      } catch (error) {
        NotifyUtils.error(error.message || 'Lấy danh sách thất bại');
      }
    }
    fetchData();
  }, []);
  const { name, phone } = user;
  const maxWidth = useMediaQuery('(max-width:715px)');
  return (
    <Paper square={!maxWidth} className={styles.paper} elevation={0}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={maxWidth ? 12 : 5}
          container
          direction="row"
          justify={maxWidth ? 'space-between' : 'flex-start'}
          className={styles.grid}
        >
          <Grid item>
            <Link href={`${MY_ORDER_URL}/${orderID}`} key={`order-row-${orderID}`}>
              <h4 className={styles.order_id}>#{orderID} &nbsp;</h4>
            </Link>
          </Grid>
          <Grid className={styles.order_status} item style={{ paddingTop: '5px' }}>
            <OrderStatusButton status={status} handleSetOrderStatus={handleSetOrderStatus} />
          </Grid>
          {maxWidth ? null : (
            <MyOrderDetail amount={amount} createdTime={createdTime} deliveryDate={deliveryDate} />
          )}
        </Grid>

        <Grid
          item
          xs={maxWidth ? 12 : 3}
          container
          direction="row"
          justify="space-between"
          className={styles.detail_small_screen}
        >
          {maxWidth ? (
            <Grid className={styles.delivery_date} item>
              {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm:ss')}
            </Grid>
          ) : null}
          <Grid className={maxWidth ? styles.price_small_screen : styles.price} item>
            {formatCurrency(totalPrice)}
          </Grid>
        </Grid>

        <Grid
          item
          xs={maxWidth ? 12 : 4}
          container
          direction={maxWidth ? 'row' : 'column'}
          justify="center"
          className={styles.grid}
        >
          <Grid item>
            <PrintInvoiceButton orderNo={orderNo} user={user} disabled={status !== ENUM_ORDER_STATUS.PENDING} />
          </Grid>
          {status === ENUM_ORDER_STATUS.PENDING && (
            <Grid item>
              <EditOrderButton />
            </Grid>
          )}
          <Grid item>
            <ResponseButton orderID={orderID} name={name} phone={phone} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderRow;
