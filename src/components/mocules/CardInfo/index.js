import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import clsx from 'clsx';
import { useCart } from 'context';
import formatCurrency from 'utils/FormarCurrency';
import { LinkComp } from '../../atoms';
import styles from './style.module.css';

const CardInfo = ({ cart, promo, className }) => {
  const { itemCount, total } = useCart();
  return (
    <Grid className={clsx(styles.container, className)} container>
      <Grid container item>
        <Grid
          xs={6}
          className={clsx(styles.wrapper, styles.text_center, styles.quantity_border)}
          item
        >
          <Typography className={styles.text}>Số lượng</Typography>
          <Typography className={clsx(styles.number, styles.quantity)}>{itemCount}</Typography>
        </Grid>
        <Grid xs={6} className={clsx(styles.wrapper, styles.text_right, styles.total_border)} item>
          <Typography className={styles.text}>Tổng tiền</Typography>
          <Typography className={clsx(styles.number, styles.price)}>
            {formatCurrency(total || 0)}
          </Typography>
        </Grid>
      </Grid>
      {promo && (
        <Grid className={clsx(styles.wrapper, styles.promo_border)} xs={12} container item>
          <LocalOffer className={styles.icon_promo} />
          <Typography>
            <a className={styles.promo_text} href="/">
              Dùng mã khuyến mãi
            </a>
          </Typography>
        </Grid>
      )}
      <Grid className={styles.wrapper} xs={12} container item>
        { cart ? (
          <LinkComp href="/checkout" className={styles.btn}>Tiếp tục thanh toán</LinkComp>
        ) : (
          <LinkComp href="/cart" className={styles.btn}>Xem giỏ hàng</LinkComp>
        )}

      </Grid>
    </Grid>
  );
};

export default CardInfo;
