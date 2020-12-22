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
import styles from './styles.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: '30px!important',
  },
});

function createData(phone, code, expiredDate, referral, paid, smsStatus) {
  return { phone, code, expiredDate, referral, paid, smsStatus };
}
const heads = [
  'Số điện thoại',
  'Mã giới thiệu',
  'Người được giới thiệu',
  'Thời gian hết hạn',
  'Số đơn hàng đã thanh toán',
  'Gửi lại SMS',
];
const rows = [
  createData(
    '0376543271',
    'DBA3674F63875',
    '29/12/2020 12:01:13',
    'Chưa tạo tài khoản',
    0,
    'Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!',
  ),
  createData(
    '0376543271',
    'DBA3674F63875',
    '29/12/2020 12:01:13',
    'Chưa tạo tài khoản',
    0,
    'Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!',
  ),
];

function DenseTable() {
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
          {rows.map((row) => (
            <TableRow key={row.code} hover>
              <TableCell component="th" scope="row">
                {row.phone}
              </TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.expiredDate}</TableCell>
              <TableCell align="left">{row.referral}</TableCell>
              <TableCell align="left">{row.paid}</TableCell>
              <TableCell align="left" className={styles.text_danger}>
                {row.smsStatus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DenseTable;
