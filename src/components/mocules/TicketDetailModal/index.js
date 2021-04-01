import { useEffect, useState } from 'react';
import { Modal } from 'components/atoms';
import { Grid } from '@material-ui/core';
import DateTimeUtils from 'utils/DateTimeUtils';
import { OrderClient, getFirst } from 'clients';
import styles from './style.module.css';

const TicketFormModal = (props) => {
  const { visible, onClose, ticket, user } = props;
  const [order, setOrder] = useState({});

  const splitNumber = (n) => {};

  useEffect(() => {
    async function fechData() {
      const orderRes = await OrderClient.getOrderById({ id: ticket.orderId });

      setOrder(getFirst(orderRes));
    }
    fechData();
  }, []);
  const { orderId, orderTime, bankName, bankCode } = ticket;

  const { customerEmail: email, customerName: name, customerPhone: phone, createdTime } = order;

  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.feedback_order}>
        <div className={styles.title}>Chi tiết phản hồi</div>
        <Grid container className={styles.container}>
          <div className={styles.info_group}>
            <Grid item xs={12} className={styles.text_body}>
              <span className={styles.label}>Phản hồi về đơn hàng #</span>
              <span className={styles.value}>{orderId}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Mã đơn hàng: </span>
              <span className={styles.value}>{orderId}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Tên khách hàng: </span>
              <span className={styles.value}>{name}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Ngày đặt hàng: </span>
              <span className={styles.value}>
                {DateTimeUtils.getFormattedWithDate(new Date(createdTime))}
              </span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Số điện thoại: </span>
              <span className={styles.value}>{phone}</span>
            </Grid>
          </div>
          <div className={styles.card}>
            <div className={styles.bank_name}> {bankName} </div>
            <div className={styles.bank_code}> {bankCode} </div>
            {/* <div className={styles.bank_code}> {bankCode} </div>
            <div className={styles.bank_code}> {bankCode} </div> */}
          </div>
        </Grid>
      </div>
    </Modal>
  );
};

export default TicketFormModal;
