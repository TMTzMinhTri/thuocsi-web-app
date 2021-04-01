import { useState } from 'react';
import { Modal, InfoFormControl, Button } from 'components/atoms';
import { Grid, TextField, NativeSelect } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { TicketClient, isValid } from 'clients';
import NotifyUtils from 'utils/NotifyUtils';
import DateTimeUtils from 'utils/DateTimeUtils';
import { v4 as uuidv4 } from 'uuid';
import UploadImages from '../UploadImages';
import styles from './style.module.css';
import InfoInput from '../InfoInput';
import validateForm from './validateForm';

const TicketFormModal = (props) => {
  const { visible, onClose, ticket } = props;

  const {
    orderID,
    name,
    phone,
    orderTime,
    orderNo,
    orderCode,
    bankInfo,
    reasonsList,
    customerCode,
    customerID,
  } = ticket;
  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.feedback_order}>
        <div className={styles.title}>Chi tiết phản hồi</div>
        <Grid container className={styles.container}>
          <div className={styles.info_group}>
            <Grid item xs={12} className={styles.text_body}>
              <span className={styles.label}>Phản hồi về đơn hàng #</span>
              <span className={styles.value}>{orderCode}</span>
            </Grid>
          </div>
        </Grid>
      </div>
    </Modal>
  );
};

export default TicketFormModal;
