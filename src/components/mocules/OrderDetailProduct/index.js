import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { LinkComp } from 'components/atoms';
import { FormarCurrency } from 'utils';
import { getPathProductBySlug } from 'constants/Paths';
import { v4 as uuidV4 } from 'uuid';
import styles from './styles.module.css';

const OrderDetailProduct = ({ products, promoName, totalDiscount }) => {
  const getTotal = () => {
    let sum = products.reduce((b, product) => product.totalPrice + b, 0);
    sum -= totalDiscount;
    return sum;
  };
  return (
    <TableContainer component={Paper} className={styles.table} elevation={4}>
      <Table>
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
          {products &&
            products.map((product) => {
              const { price, totalPrice, quantity } = product;
              const { imageUrls = [], name = '', slug = '' } = product?.productInfo || {};

              return (
                <TableRow key={uuidV4()} className={styles.product_row}>
                  <TableCell align="left">
                    <StarIcon />
                  </TableCell>
                  <TableCell>
                    <img src={imageUrls ? imageUrls[0] : ''} alt={name} width={50} height={30} />
                  </TableCell>
                  <TableCell align="left" className={styles.product_name}>
                    <LinkComp
                      variant="h5"
                      href={getPathProductBySlug(slug)}
                      className={styles.product_name}
                    >
                      {name}
                    </LinkComp>
                  </TableCell>
                  <TableCell align="center" className={styles.product_price}>
                    {`${quantity} x ${FormarCurrency(price)}`}
                  </TableCell>
                  <TableCell align="center">{FormarCurrency(totalPrice)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Grid container justify="space-between" className={styles.promo}>
        <Grid item>Mã giảm giá {promoName}</Grid>
        <Grid item>-{FormarCurrency(totalDiscount)}</Grid>
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
