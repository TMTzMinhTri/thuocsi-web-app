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
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { isEmpty } from 'utils/ValidateUtils';
import { getPathProductBySlug } from 'constants/Paths';
import { MISSING_IMAGE } from 'constants/Images';
import { v4 as uuidV4 } from 'uuid';
import styles from './styles.module.css';
import SellerInfo from '../SellerInfo';

const OrderDetailProduct = ({
  products,
  promoName,
  totalDiscount,
  totalPrice: totalPriceAll,
  paymentMethodFee,
  deliveryPlatformFee,
  subTotalPrice,
}) => (
  <TableContainer component={Paper} className={styles.table} elevation={4}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell />
          <TableCell>Sản phẩm</TableCell>
          <TableCell align="right">Số lượng</TableCell>
          <TableCell align="right">Giá (đ)</TableCell>
          <TableCell align="right">Tổng cộng (đ)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products &&
          products.map((product) => {
            const { salePrice, totalPrice, quantity, isImportant } = product;
            const { imageUrls = [], name = '', slug = '', seller = null } =
              product?.productInfo || {};

            return (
              <TableRow key={uuidV4()} className={styles.product_row}>
                <TableCell align="left">
                  <StarIcon style={{ color: isImportant ? '#f9b514' : '' }} />
                </TableCell>
                <TableCell>
                  <LinkComp href={getPathProductBySlug(slug)}>
                    <img
                      src={!isEmpty(imageUrls) ? imageUrls[0] : MISSING_IMAGE}
                      alt={name}
                      width={50}
                      height={30}
                    />
                  </LinkComp>
                </TableCell>
                <TableCell align="left" className={styles.product_name}>
                  <LinkComp
                    variant="h5"
                    href={getPathProductBySlug(slug)}
                    className={styles.product_name}
                    padding="0px"
                  >
                    {name}
                  </LinkComp>

                  <SellerInfo seller={seller} />
                </TableCell>
                <TableCell align="right" className={styles.product_price}>
                  {quantity}
                </TableCell>
                <TableCell align="right" className={styles.product_price}>
                  {formatNumber(salePrice)}
                </TableCell>
                <TableCell align="right">{formatNumber(totalPrice)}</TableCell>
              </TableRow>
            );
          })}
        <TableRow key={uuidV4()} className={styles.product_row}>
          
          <TableCell align="right" colSpan="5">
            <div className={styles.total_bottom}>Tạm tính :</div>
            <div className={styles.total_bottom}>Phí theo hình thức thanh toán :</div>
            <div className={styles.total_bottom}>Phí vận chuyển :</div>
            {!isEmpty(promoName) && (
              <div className={styles.total_bottom}>
                Mã giảm giá <strong>{promoName} :</strong>
              </div>
            )}
          </TableCell>

          <TableCell align="right">
            <div className={styles.total_bottom}>{formatNumber(subTotalPrice)} </div>
            <div className={styles.total_bottom}>{formatNumber(paymentMethodFee)} </div>
            <div className={styles.total_bottom}>{formatNumber(deliveryPlatformFee)} </div>
            {!isEmpty(promoName) && (
              <div className={styles.total_bottom}>{formatNumber(-totalDiscount)} </div>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Grid
      className={styles.total_price}
      container
      justify="flex-end"
      style={{ padding: ' 30px 15px' }}
      spacing={3}
    >
      <Grid item className={styles.price_label}>
        Tổng cộng
      </Grid>
      <Grid item className={styles.price}>
        {formatCurrency(totalPriceAll)}
      </Grid>
    </Grid>
  </TableContainer>
);

export default OrderDetailProduct;
