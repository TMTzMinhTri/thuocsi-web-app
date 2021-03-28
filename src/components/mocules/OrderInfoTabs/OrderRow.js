import { useState } from 'react';
import { Grid, Paper, useMediaQuery } from '@material-ui/core';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import Link from 'next/link';
import { MY_ORDER_URL } from 'constants/Paths';
import { useModal } from 'hooks';
import { v4 as uuidv4 } from 'uuid';
import EditOrderButton from '../EditOrderButton';
import TicketButton from '../TicketButton';
import TicketFormModal from '../TicketFormModal';
import styles from './styles.module.css';
import OrderStatusButton from './OrderStatusButton';

const MyOrderDetail = ({ amount, createdTime, deliveryDate = null }) => (
  <Grid item xs={12}>
    <div>
      <span className={styles.order_detail_label}>Sản phẩm: </span> {amount}
    </div>
    <div>
      <span className={styles.order_detail_label}>Ngày mua: </span>
      {DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm:ss')}
    </div>
    {deliveryDate && (
      <div>
        <span className={styles.order_detail_label}> Dự kiến giao ngày: </span>
        {DateTimeUtils.getFormattedWithDate(new Date(deliveryDate))}
      </div>
    )}
  </Grid>
);
const OrderRow = ({
  orderId: orderID,
  orderNo,
  createdTime,
  deliveryDate,
  customerName,
  customerPhone,
  customerID,
  customerCode,
  status,
  totalPrice,
  handleSetOrderStatus,
  bankInfo,
  reasonsList,
  totalItems,
  canEdit,
}) => {
  const [orderTicket, setOrderTicket] = useState({});
  const [open, toggleOpen] = useModal();

  const handleChangeOrderTicket = (value) => {
    setOrderTicket(value);
  };

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
            <Link href={`${MY_ORDER_URL}/${orderID}`} key={`order-row-${uuidv4()}`}>
              <h4 className={styles.order_id}>#{orderID} &nbsp;</h4>
            </Link>
          </Grid>
          <Grid className={styles.order_status} item style={{ paddingTop: '5px' }}>
            <OrderStatusButton status={status} handleSetOrderStatus={handleSetOrderStatus} />
          </Grid>
          {maxWidth ? null : (
            <MyOrderDetail
              amount={totalItems}
              createdTime={createdTime}
              deliveryDate={deliveryDate}
            />
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
          {/* <Grid item>
            <PrintInvoiceButton orderNo={orderNo} user={user} disabled={status !== ENUM_ORDER_STATUS.PENDING} />
          </Grid> */}

          {status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM && (
            <Grid item>
              <EditOrderButton orderNo={orderNo} canEdit={canEdit} />
            </Grid>
          )}
          <Grid item>
            <TicketButton
              order={{
                orderID,
                orderNo,
                orderTime: createdTime,
                deliveryDate,
                name: customerName,
                phone: customerPhone,
              }}
              handleChangeOrderTicket={handleChangeOrderTicket}
              handleOpenModal={toggleOpen}
            />
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <TicketFormModal
          {...orderTicket}
          bankInfo={bankInfo}
          reasonsList={reasonsList}
          customerID={customerID}
          customerCode={customerCode}
          visible={open}
          onClose={toggleOpen}
        />
      )}
    </Paper>
  );
};

export default OrderRow;
