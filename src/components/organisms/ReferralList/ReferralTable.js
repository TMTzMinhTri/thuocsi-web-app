import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  makeStyles,
} from '@material-ui/core';
import { Button } from 'components/atoms';
import { DateTimeUtils } from 'utils';
import styles from './styles.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: '30px!important',
  },
});

const heads = [
  'Số điện thoại',
  'Mã giới thiệu',
  'Thời gian hết hạn',
  'Người được giới thiệu',
  'Số đơn hàng đã thanh toán',
  'Gửi lại SMS',
];

const SendSMSButton = () => <Button classes={{ root: styles.button_send_sms }}>Gửi SMS</Button>;

function ReferralTable({ referrals }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {heads.map((head) => (
              <TableCell classes={{ root: styles.table_head }} align="left">
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((row) => (
            <TableRow key={row.code} hover>
              <TableCell component="th" scope="row">
                {row.phone}
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">
                {DateTimeUtils.getFormattedDate(new Date(row.expiredAt), 'DD/MM/YYYY HH:mm:ss')}
              </TableCell>
              <TableCell align="left">
                {row.isRegister ? row.userName : 'Chưa tạo tài khoản'}
              </TableCell>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReferralTable;
