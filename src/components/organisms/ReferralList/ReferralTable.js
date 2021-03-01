import { TableRow, TableCell, Button, Grid, Paper } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { ALIGN } from 'constants/Enums';
import styles from './styles.module.css';

const heads = [
  { text: 'Số điện thoại', align: ALIGN.LEFT },
  { text: 'Mã giới thiệu', align: ALIGN.LEFT },
  { text: 'Thời gian hết hạn', align: ALIGN.LEFT },
  { text: 'Trạng thái', align: ALIGN.LEFT },
  // { text: 'Số đơn hàng đã thanh toán', align: ALIGN.LEFT },
  { text: 'Gửi lại SMS', align: ALIGN.LEFT },
];

function ReferralTable({ referrals, handleSendSMS }) {
  const SendSMSButton = () => {
    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
      <Button classes={{ root: styles.button_send_sms }} onClick={handleSendSMS}>
        Gửi SMS
      </Button>
    </div>;
  };
  return (
    <div style={{ overflowX: 'auto' }}>
      {referrals.length > 0 ? (
        <InfoTable heads={heads} className={styles.bottom_square}>
          {referrals.map((row) => (
            <TableRow hover key={uuidv4()}>
              <TableCell component="th" scope="row">
                {row.phone}
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">
                {DateTimeUtils.getFormattedDate(new Date(row.expireTime), 'DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell align="left">
                {row.isRegister ? row.userName : 'Chưa tạo tài khoản'}
              </TableCell>
              {/* <TableCell align="left">{row.paid}</TableCell> */}
              <TableCell align="left" className={styles.text_danger}>
                {row.canResendSMS ? (
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
      ) : (
        <Grid container justify="center">
          <Paper className={styles.not_friend}>Bạn chưa giới thiệu bạn bè</Paper>
        </Grid>
      )}
    </div>
  );
}

export default ReferralTable;
