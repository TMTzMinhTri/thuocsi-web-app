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
  const { visible, onClose, orderID, name, phone, orderTime, orderNo, bankInfo, reasonsList } = props;
  const [reason, setReason] = useState(0);
  const [val, setVal] = useState({
    bankCode: bankInfo?.bankCode || '',
    bankName: bankInfo?.bankName || '',
    bankBranch: bankInfo?.bankBranch || '',
    bankAccountName: bankInfo?.bankAccountName || '',
    note: '',
    imageUrls: [],
  });
  const handleChangeValue = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleOnChangeReason = (e) => {
    setReason(e.target.value);
  };

  const onSubmit = async () => {
    const data = {
      ...val,
      orderNo,
      saleOrderCode: orderNo,
      saleOrderID: orderID,
      reasons: [reason],
    };
    try {
      validateForm(val);
      const feedbackResult = await TicketClient.createFeedback(data);
      if (!isValid(feedbackResult))
        throw new Error(feedbackResult.message || 'Gửi phản hồi thất bại');
      NotifyUtils.success('Gửi phản hồi thành công');
      // clear
      onClose();
      setVal({});
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  const handleOnChangeImages = (imgs) => {
    setVal({ ...val, imageUrls: imgs });
  };
  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.feedback_order}>
        <div className={styles.title}>Phản Hồi Về Đơn Hàng</div>
        <Grid container className={styles.container}>
          <div className={styles.info_group}>
            <Grid item xs={12} className={styles.text_body}>
              <span className={styles.label}>Phản hồi về đơn hàng #</span>
              <span className={styles.value}>{orderID}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Mã đơn hàng: </span>
              <span className={styles.value}>{orderID}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Tên khách hàng: </span>
              <span className={styles.value}>{name}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Ngày đặt hàng: </span>
              <span className={styles.value}>
                {DateTimeUtils.getFormattedWithDate(new Date(orderTime))}
              </span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Số điện thoại: </span>
              <span className={styles.value}>{phone}</span>
            </Grid>
          </div>
          <Grid item xs={12} container justify="flex-start" spacing={1}>
            <InfoFormControl xs={12} md={6} label="Lý do phản hồi" isRequired>
              <NativeSelect
                input={<InfoInput />}
                IconComponent={ExpandMore}
                value={reason}
                onChange={handleOnChangeReason}
                className={styles.reason_select}
              >
                {reasonsList.map((reasonE) => (
                  <option key={`key-reason-${uuidv4()}`} value={reasonE.code}>
                    {reasonE.name}
                  </option>
                ))}
              </NativeSelect>
            </InfoFormControl>
          </Grid>
          <Grid item xs={12} container justify="space-evenly" spacing={1}>
            <InfoFormControl xs={12} md={6} label="Tên chủ tài khoản" htmlFor="bankAccountName">
              <InfoInput
                id="bankAccountName"
                placeholder="Nhập tên chủ tài khoản"
                value={val.bankAccountName}
                onChange={(e) => handleChangeValue('bankAccountName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Số tài khoản" isRequired htmlFor="bankCode">
              <InfoInput
                id="bankCode"
                placeholder="Nhập số tài khoản"
                value={val.bankCode}
                onChange={(e) => handleChangeValue('bankCode', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Ngân hàng" htmlFor="bankName">
              <InfoInput
                id="bankName"
                placeholder="Nhập tên ngân hàng"
                value={val.bankName}
                onChange={(e) => handleChangeValue('bankName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={12} md={6} label="Chi nhánh" htmlFor="bankBranch">
              <InfoInput
                id="bankBranch"
                placeholder="Nhập tên chi nhánh"
                value={val.bankBranch}
                onChange={(e) => handleChangeValue('bankBranch', e.target.value)}
              />
            </InfoFormControl>
          </Grid>
          <Grid
            className={styles.textarea}
            item
            xs={12}
            container
            justify="space-evenly"
            spacing={1}
          >
            <InfoFormControl label="Nội dung phản hồi" xs={12} isRequired htmlFor="description">
              <br />
              <TextField
                id="description"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Mời nhập nội dung phản hồi"
                value={val.note}
                onChange={(e) => handleChangeValue('note', e.target.value)}
                style={{ background: '#fff' }}
              />
            </InfoFormControl>
          </Grid>
          <Grid
            className={styles.textarea}
            item
            xs={12}
            container
            justify="space-evenly"
            spacing={1}
          >
            <UploadImages onChange={handleOnChangeImages} />
          </Grid>
          <Grid className={styles.textarea} item container justify="center" xs={12} spacing={1}>
            <Button className="payment_button" onClick={onSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default TicketFormModal;
