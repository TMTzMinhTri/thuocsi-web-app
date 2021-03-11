import { useState } from 'react';
import { Modal, InfoFormControl, Button } from 'components/atoms';
import { Grid, TextField, NativeSelect } from '@material-ui/core';
import { FEEDBACK_REASON } from 'constants/Enums';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TicketClient, isValid } from 'clients';
import NotifyUtils from 'utils/NotifyUtils';
import DateTimeUtils from 'utils/DateTimeUtils';
import styles from './style.module.css';
import InfoInput from '../InfoInput';

const TicketFormModal = (props) => {
  const { visible, onClose, orderID, name, phone, orderTime, orderNo } = props;

  const [reason, setReason] = useState(FEEDBACK_REASON.VAN_DE_KHAC.code);

  const [val, setVal] = useState({
    bankCode: '',
    bankName: '',
    bankBranch: '',
    accountName: '',
    note: '',
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
      reasons: [FEEDBACK_REASON[reason].code],
    };
    try {
      const feedbackResult = await TicketClient.createFeedback(data);
      if (!isValid(feedbackResult))
        throw new Error(feedbackResult.message || 'Gửi phản hồi thất bại');
    } catch (error) {
      NotifyUtils.error(error.message);
    }

    NotifyUtils.success('Gửi phản hồi thành công');
  };
  return (
    <Modal open={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.title}>Phản hồi về đơn hàng</div>
        <Grid container>
          <Grid item xs={12} className={styles.text_body}>
            Phản hồi về đơn hàng #{orderID}:
          </Grid>
          <Grid item xs={5} className={styles.text_body}>
            Tên khách hàng: {name}
          </Grid>
          <Grid item xs={5} className={styles.text_body}>
            Số điện thoại: {phone}
          </Grid>
          <Grid item xs={12} className={styles.text_body}>
            Mã đơn hàng: {orderID}
          </Grid>
          <Grid item xs={12} className={styles.text_body}>
            Ngày đặt hàng: {DateTimeUtils.getFormattedWithDate(new Date(orderTime))}
          </Grid>
          <InfoFormControl xs={6} label="Lý do phản hồi" isRequired>
            <NativeSelect
              input={<InfoInput />}
              IconComponent={ExpandMoreIcon}
              value={reason}
              onChange={handleOnChangeReason}
              className={styles.reason_select}
            >
              {Object.keys(FEEDBACK_REASON).map((reasonE) => (
                <option
                  key={`key-reason-${FEEDBACK_REASON[reasonE].code}`}
                  value={FEEDBACK_REASON[reasonE].code}
                >
                  {FEEDBACK_REASON[reasonE].name}
                </option>
              ))}
            </NativeSelect>
          </InfoFormControl>
          <Grid item xs={12} container justify="space-evenly" spacing={3}>
            <InfoFormControl xs={3} isRequired label="Tên chủ tài khoản" htmlFor="accountName">
              <InfoInput
                id="accountName"
                placeholder="Nhập tên chủ tài khoản"
                value={val.accountName}
                onChange={(e) => handleChangeValue('accountName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={3} isRequired label="Số tài khoản" htmlFor="bankCode">
              <InfoInput
                id="bankCode"
                placeholder="Nhập số tài khoản"
                value={val.bankCode}
                onChange={(e) => handleChangeValue('bankCode', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={3} isRequired label="Ngân hàng" htmlFor="bankName">
              <InfoInput
                id="bankName"
                placeholder="Nhập tên ngân hàng"
                value={val.bankName}
                onChange={(e) => handleChangeValue('bankName', e.target.value)}
              />
            </InfoFormControl>
            <InfoFormControl xs={3} isRequired label="Chi nhánh" htmlFor="bankBranch">
              <InfoInput
                id="bankBranch"
                placeholder="Nhập tên chi nhánh"
                value={val.bankBranch}
                onChange={(e) => handleChangeValue('bankBranch', e.target.value)}
              />
            </InfoFormControl>
          </Grid>
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

          <InfoFormControl label="Hình ảnh minh hoạ lỗi" xs={12} isRequired htmlFor="name">
            <Button className="response__button--upload">Bạn có thể upload tối đa 6 hình</Button>
          </InfoFormControl>
          <Grid item container justify="center" xs={12}>
            <Button className="response__button--send" onClick={onSubmit}>
              Gửi yêu cầu
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default TicketFormModal;
