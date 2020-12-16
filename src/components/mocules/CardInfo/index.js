import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import clsx from 'clsx';
import styles from './style.module.css';

const CardInfo = ({ cart, promo, total, quantity, className }) => (
  <Grid className={clsx(styles.container, className)} container>
    <Grid container item>
      <Grid
        xs={6}
        className={clsx(styles.wrapper, styles.text_center, styles.quantity_border)}
        item
      >
        <Typography className={styles.text}>Số lượng</Typography>
        <Typography className={clsx(styles.number, styles.quantity)}>{quantity}</Typography>
      </Grid>
      <Grid xs={6} className={clsx(styles.wrapper, styles.text_right, styles.total_border)} item>
        <Typography className={styles.text}>Tổng tiền</Typography>
        <Typography className={clsx(styles.number, styles.price)}>{total}</Typography>
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
      <Button className={styles.btn}>{cart ? 'Tiếp tục thanh toán' : 'Xem giỏ hàng'}</Button>
    </Grid>
  </Grid>
);

export default CardInfo;
