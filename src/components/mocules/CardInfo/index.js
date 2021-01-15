import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { useCart } from 'context';
import formatCurrency from 'utils/FormarCurrency';
import { CartClient } from 'clients';
import { LinkComp } from '../../atoms';
import PromoListModal from '../PromoListModal';
import styles from './style.module.css';

const PROMO_CODE_DEFAULT = '';

const DeleteIconButton = (props) => (
  <IconButton style={{ padding: 0 }}>
    <DeleteIcon {...props} />
  </IconButton>
);

const CardInfo = ({ cart, promo, className }) => {
  const { itemCount, total, updateCart, redeemCode } = useCart();
  const [promoVisible, setPromoVisible] = useState(false);
  const handleSetPromoVisible = () => {
    setPromoVisible(!promoVisible);
  };

  const handleRemoveRedeemCode = async () => {
    await CartClient.updateRedeemCode(PROMO_CODE_DEFAULT);
    updateCart();
  };

  const handleChangePromo = async (code) => {
    setPromoVisible(false);
    await CartClient.updateRedeemCode(code);
    updateCart();
  };

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
          <Typography onClick={handleSetPromoVisible} className={styles.counpon_button}>
            {redeemCode || 'Dùng mã khuyến mãi'}
          </Typography>
          {redeemCode ? <DeleteIconButton onClick={handleRemoveRedeemCode} /> : <div />}
        </Grid>
      )}
      <Grid className={styles.wrapper} xs={12} container item>
        {cart ? (
          <LinkComp href="/checkout" className={styles.btn}>
            Tiếp tục thanh toán
          </LinkComp>
        ) : (
          <LinkComp href="/cart" className={styles.btn}>
            Xem giỏ hàng
          </LinkComp>
        )}
      </Grid>
      <PromoListModal
        visible={promoVisible}
        onClose={handleSetPromoVisible}
        handleChangePromo={handleChangePromo}
      />
    </Grid>
  );
};

export default CardInfo;
