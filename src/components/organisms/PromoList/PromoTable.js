import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { DateTimeUtils, FormarCurrency } from 'utils';
import InfoIcon from '@material-ui/icons/Info';
import styles from './styles.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: '30px!important',
  },
});

const heads = [
  'Mã',
  'Ngày nhập',
  'Số lần sử dụng',
  'Đã dùng (/lần)',
  'Hạn dùng',
  'Giá trị đơn hàng tối thiểu',
  'Đã hết hạn',
  'Đơn hàng liên quan',
];

function PromoTable({ promos }) {
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
          {promos.map((row) => (
            <TableRow key={row.code} hover>
              <TableCell align="left">
                <Grid container direction="column">
                  <Grid item> {row.code}</Grid>
                  <Grid item>
                    <InfoIcon classes={{ root: styles.icon }} />
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="left">
                {DateTimeUtils.getFormattedDate(new Date(row.createdAt), 'DD/MM/YYYY HH:mm')}
              </TableCell>
              <TableCell align="left">
                {row.maxUse === -1 ? 'Không giới hạn' : row.maxUse}
              </TableCell>
              <TableCell align="left">{row.used}</TableCell>
              <TableCell align="left">
                {DateTimeUtils.getFormattedDate(new Date(row.expiredAt), 'DD/MM/YYYY HH:mm')}
              </TableCell>
              <TableCell align="left">{FormarCurrency(row.minCost)}</TableCell>
              <TableCell align="left">{row.isExpired ? 'Chưa hết hạn' : 'Đã hết hạn'}</TableCell>
              <TableCell align="left" className={styles.related_order}>
                #{row.relatedOrder}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PromoTable;
