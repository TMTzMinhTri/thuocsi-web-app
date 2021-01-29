import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LocalOffer } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { useCart } from 'context';
import formatCurrency from 'utils/FormarCurrency';
import { CartClient, isValid } from 'clients';
import { NotifyUtils } from 'utils';
import { Button, LinkComp } from 'components/atoms';
import { CART_URL } from 'constants/Paths';
import { useRouter } from 'next/router';
import PromoListModal from '../PromoListModal';
import styles from './style.module.css';

const PROMO_CODE_DEFAULT = '';

const DeleteIconButton = (props) => (
  <IconButton style={{ padding: 0 }}>
    <DeleteIcon {...props} />
  </IconButton>
);
const handleToCheckout = () => {};

const PaymentButton = ({ user }) => (
  <>
    {user?.isActive ? null : (
      <Alert severity="error" style={{ margin: '5px' }}>
        Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Vui lòng liên hệ 02 873 008
        840 để kích hoạt
      </Alert>
    )}
    <LinkComp href="/checkout" className={styles.width100}>
      <Button
        disabled={!user.isActive}
        btnType="payment"
        className="payment_button"
        onClick={handleToCheckout}
      >
        Tiếp tục thanh toán
      </Button>
    </LinkComp>
  </>
);

const CardInfo = ({ cart, promo, className, user }) => {
  const { itemCount, total, updateCart, redeemCode } = useCart();
  const router = useRouter();
  const [promoVisible, setPromoVisible] = useState(false);
  const handleSetPromoVisible = () => {
    setPromoVisible(!promoVisible);
  };

  const handleRemoveRedeemCode = async () => {
    try {
      const res = await CartClient.updateRedeemCode(PROMO_CODE_DEFAULT);
      if (!isValid(res)) throw new Error(res.messsage);
      updateCart();
      NotifyUtils.success('Xoá mã giảm giá thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Xoá mã giảm giá không thành công');
    }
  };

  const handleChangePromo = async (code) => {
    setPromoVisible(false);
    try {
      const res = await CartClient.updateRedeemCode(code);
      if (!isValid(res)) throw new Error(res.messsage);
      updateCart();
      NotifyUtils.success('Thêm mã giảm giá thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Thêm mã giảm giá không thành công');
    }
  };

  return (
    <div className={className}>
      <Grid className={clsx(styles.container)} container>
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
          <Grid
            className={clsx(styles.wrapper, styles.promo_border)}
            xs={12}
            container
            item
            direction="row"
          >
            <LocalOffer className={styles.icon_promo} />
            <Typography onClick={handleSetPromoVisible} className={styles.counpon_button}>
              {redeemCode || 'Dùng mã khuyến mãi'}
            </Typography>
            {redeemCode ? <DeleteIconButton onClick={handleRemoveRedeemCode} /> : <div />}
          </Grid>
        )}
        <Grid className={styles.wrapper} xs={12} container item>
          {cart ? (
            <PaymentButton user={user} />
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
          redeemCode={redeemCode}
          totalPrice={total}
        />
      </Grid>
      {router.pathname === CART_URL && (
      <Grid className={styles.wrapper} xs={12} container item>
        <LinkComp
          className={clsx(styles.counpon_button, styles.quick_link)}
          name="<< Tiếp tục đặt hàng"
          href="/quick-order"
          color="#00b46e"
        />
      </Grid>
    )}
    </div>
  );
};

export default CardInfo;
