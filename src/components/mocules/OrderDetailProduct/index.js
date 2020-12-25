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

const OrderDetailProduct = ({ products, promo }) => {
  const classes = useStyles();
  const getTotalByProduct = (price, quantity) => price * quantity;
  const getTotal = () => {
    let sum = products.reduce(
      (b, product) => getTotalByProduct(product.price, product.quantity) + b,
      0,
    );
    sum -= promo.total;
    return sum;
  };
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
          {products.map((product) => (
            <TableRow key={product.name} className={styles.product_row}>
              <TableCell align="left">
                <StarIcon />
              </TableCell>
              <TableCell>
                <img src={product.image} alt={product.name} width={50} height={30} />
              </TableCell>
              <TableCell align="left" className={styles.product_name}>
                {product.name}
              </TableCell>
              <TableCell align="center" className={styles.product_price}>
                {`${product.quantity} x ${FormarCurrency(product.price)}`}
              </TableCell>
              <TableCell align="center">
                {FormarCurrency(getTotalByProduct(product.price, product.quantity))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justify="space-between" className={styles.promo}>
        <Grid item>Mã giảm giá {promo.name}</Grid>
        <Grid item>-{FormarCurrency(promo.total)}</Grid>
      </Grid>
      <Grid container justify="flex-end" style={{ padding: ' 30px 45px' }} spacing={3}>
        <Grid item className={styles.price_label}>
          Tổng cộng
        </Grid>
        <Grid item className={styles.price}>
          {FormarCurrency(getTotal())}
        </Grid>
      </Grid>
    </TableContainer>
  );
};

export default OrderDetailProduct;
