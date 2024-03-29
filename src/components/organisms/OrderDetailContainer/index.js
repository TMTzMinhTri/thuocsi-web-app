import { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import {
  OrderDetailStep,
  OrderDetailInfo,
  OrderDetailProduct,
  TicketButton,
  EditOrderButton,
  TicketFormModal,
  PrintInvoiceButton,
} from 'components/mocules';
import { PATH_INFO_BILL, MY_ORDER_URL } from 'constants/Paths';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import Link from 'next/link';
import { useModal } from 'hooks';
import styles from './styles.module.css';

const isShowInvoice = false;

const OrderDetailContainer = ({ order, bankInfo, reasonsList, isMobile, user }) => {
  const [orderTicket, setOrderTicket] = useState({});
  const [open, toggleOpen] = useModal();

  const handleChangeOrderTicket = (value) => {
    setOrderTicket(value);
  };

  // const isCanExport = order;

  const PrintInvoiceEle = (
    <Grid item className={styles.print_invoice}>
      <Paper classes={{ root: styles.container }} elevation={3}>
        <Grid className={styles.print_invoice_button} container direction="row">
          <Grid item xs={3}>
            <PrintInvoiceButton
              orderNo={order.orderNo}
              user={user}
              disabled={order.status !== ENUM_ORDER_STATUS.PENDING}
            />
          </Grid>
          <Grid item container direction="column" justify="center" xs={5}>
            {order.status === ENUM_ORDER_STATUS.CANCEL ||
            order.status === ENUM_ORDER_STATUS.COMPLETED ? (
              <div className={styles.text_danger}>
                Đơn hàng của bạn đã quá thời gian để xuất hóa đơn
              </div>
            ) : (
              <div className={styles.text_bill}>
                Xem thông tin xuất hoá đơn đỏ&nbsp;
                <a href={PATH_INFO_BILL} target="_blank" rel="noreferrer">
                  tại đây
                </a>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper classes={{ root: styles.container }} elevation={3}>
          <Grid container>
            {!isMobile && (
              <Grid item xs={12}>
                <h3 className={styles.title}> Chi tiết đơn hàng #{order.orderId} </h3>
              </Grid>
            )}
            <Grid item xs={12}>
              <OrderDetailStep status={order?.status} />
            </Grid>
            <Grid item xs={12} classes={{ root: styles.order_status_bottom }}>
              <Grid container justify="center" direction="column">
                <div className={styles.order_status_bottom_text}>
                  Dự kiến giao vào &nbsp;
                  <span>
                    {order.deliveryDate
                      ? DateTimeUtils.getFormattedWithDate(new Date(order.deliveryDate))
                      : '(Chưa có)'}
                  </span>
                </div>
              </Grid>
              <Grid
                className={styles.order_button}
                item
                container
                direction="row"
                justify="flex-end"
              >
                <EditOrderButton orderNo={order.orderNo} canEdit={order.canEdit} />
                <TicketButton
                  order={{
                    ...order,
                    orderID: order.orderId,
                    orderTime: order.createdTime,
                    name: order?.customerName,
                    phone: order?.customerPhone,
                  }}
                  handleChangeOrderTicket={handleChangeOrderTicket}
                  handleOpenModal={toggleOpen}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {open && (
          <TicketFormModal
            {...orderTicket}
            bankInfo={bankInfo}
            reasonsList={reasonsList}
            visible={open}
            onClose={toggleOpen}
          />
        )}
      </Grid>

      {isShowInvoice && <PrintInvoiceEle />}

      <Grid item xs={12}>
        <OrderDetailInfo {...order} />
      </Grid>

      <Grid className={styles.table_wrapper} item xs={12}>
        <OrderDetailProduct
          products={order?.products || []}
          promoName={order?.redeemCode}
          totalDiscount={order?.totalDiscount}
          totalPrice={order?.totalPrice}
          paymentMethodFee={order?.paymentMethodFee}
          deliveryPlatformFee={order?.deliveryPlatformFee}
          subTotalPrice={order?.subTotalPrice}
        />
      </Grid>
      <Grid item xs={12} className={styles.comeback}>
        <Link href={MY_ORDER_URL} prefetch={false}>
          &lt;&lt; Quay lại đơn hàng của tôi
        </Link>
      </Grid>
    </Grid>
  );
};

export default OrderDetailContainer;
