import { TableRow, TableCell, Button } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { DateTimeUtils, NotifyUtils } from 'utils';
import styles from './styles.module.css';

const heads = [
  'Số điện thoại',
  'Mã giới thiệu',
  'Thời gian hết hạn',
  'Người được giới thiệu',
  'Số đơn hàng đã thanh toán',
  'Gửi lại SMS',
];

const SendSMSButton = () => {
  const handleSendSMS = () => {
    NotifyUtils.success('Gửi SMS thành công');
  };
  return (
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <Button classes={{ root: styles.button_send_sms }} onClick={handleSendSMS}>Gửi SMS</Button>
    </div>
  );
};

function ReferralTable({ referrals }) {
  return (
    <InfoTable heads={heads}>
      {referrals.map((row) => (
        <TableRow key={row.code} hover>
          <TableCell component="th" scope="row">
            {row.phone}
          </TableCell>
          <TableCell align="left">{row.code}</TableCell>
          <TableCell align="left">
            {DateTimeUtils.getFormattedDate(new Date(row.expiredAt), 'DD/MM/YYYY HH:mm:ss')}
          </TableCell>
          <TableCell align="left">{row.isRegister ? row.userName : 'Chưa tạo tài khoản'}</TableCell>
          <TableCell align="left">{row.paid}</TableCell>
          <TableCell align="left" className={styles.text_danger}>
            {row.canSendSMS ? (
              <SendSMSButton />
            ) : (
              <span className={styles.text_danger}>
                Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!
              </span>
            )}
          </TableCell>
        </TableRow>
      ))}
    </InfoTable>
  );
}

export default ReferralTable;
