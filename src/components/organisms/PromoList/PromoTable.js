import { TableRow, TableCell, Grid } from '@material-ui/core';
import { DateTimeUtils, FormarCurrency } from 'utils';
import InfoIcon from '@material-ui/icons/Info';
import { InfoTable } from 'components/atoms';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

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
  const router = useRouter();
  return (
    <InfoTable heads={heads}>
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
          <TableCell align="left">{row.maxUse === -1 ? 'Không giới hạn' : row.maxUse}</TableCell>
          <TableCell align="left">{row.used}</TableCell>
          <TableCell align="left">
            {DateTimeUtils.getFormattedDate(new Date(row.expiredAt), 'DD/MM/YYYY HH:mm')}
          </TableCell>
          <TableCell align="left">{FormarCurrency(row.minCost)}</TableCell>
          <TableCell align="left">{row.isExpired ? 'Chưa hết hạn' : 'Đã hết hạn'}</TableCell>
          <TableCell
            align="left"
            className={styles.related_order}
            onClick={() => {
              router.push(`/my-order/${row.relatedOrder}`);
            }}
          >
            #{row.relatedOrder}
          </TableCell>
        </TableRow>
      ))}
    </InfoTable>
  );
}

export default PromoTable;
