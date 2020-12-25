import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TableBody,
  Grid,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { FormarCurrency } from 'utils';
import styles from './styles.module.css';
// import Image from 'next/image';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: '15px!important',
  },
});

function createData(name, price, total) {
  return { name, price, total };
}

const rows = [
  createData('marvelon bayer (h/21v)', 530300, 530300),
  createData('alpha choay sanofi (h/30v) (date cận) test update', 61000, 61000),
  createData('Eclair', 262000, 300000),
  createData('Cupcake', 305000, 370000),
  createData('Gingerbread', 356000, 1600000),
];

const OrderDetailProduct = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="center">Sản phẩm</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Tổng cộng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} className={styles.product_row}>
              <TableCell align="left">
                <StarIcon />
              </TableCell>
              <TableCell>
                <img
                  src="https://images.thuocsi.vn/uSSSjXoCYfnBPW7ffPTe7o6j"
                  alt={row.name}
                  width={50}
                  height={30}
                />
              </TableCell>
              <TableCell align="left" className={styles.product_name}>
                {row.name}
              </TableCell>
              <TableCell align="center">{FormarCurrency(row.price)}</TableCell>
              <TableCell align="center">{FormarCurrency(row.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justify="space-between" className={styles.promo}>
        <Grid item>Mã giảm giá NEWBIE300K1</Grid>
        <Grid item>-300.000đ</Grid>
      </Grid>
      <Grid container justify="flex-end" style={{ padding: ' 30px 45px' }} spacing={3}>
        <Grid item className={styles.price_label}>
          Tổng cộng
        </Grid>
        <Grid item className={styles.price}>
          3.024.100đ
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default OrderDetailProduct;
