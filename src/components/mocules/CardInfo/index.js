import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { LocalOffer } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { useCart } from 'context';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { CartClient } from 'clients';
import { LinkComp, ButtonDefault } from 'components/atoms';
import { CART_URL, QUICK_ORDER, CHECKOUT_URL } from 'constants/Paths';
import Router, { useRouter } from 'next/router';
import { isEmpty } from 'utils/ValidateUtils';
import PromoListModal from '../PromoListModal';
import styles from './style.module.css';

const DeleteIconButton = (props) => (
  <IconButton {...props} style={{ padding: 0 }}>
    <DeleteIcon />
  </IconButton>
);
const handleToCheckout = () => {
  Router.push(CHECKOUT_URL);
};

const PaymentButton = ({ user }) => (
  <>
    {user?.isActive ? null : (
      <Alert severity="error" style={{ margin: '5px' }}>
        Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Vui lòng liên hệ 02 873 008
        840 để kích hoạt
      </Alert>
    )}
    <ButtonDefault
      disabled={!user.isActive}
      btnType="warning"
      className="payment_button"
      onClick={handleToCheckout}
    >
      Tiếp tục thanh toán
    </ButtonDefault>
  </>
);

const CardInfo = ({ cart, promo, className, user }) => {
  const { itemCount, totalPrice, subTotalPrice, updateCart, redeemCode } = useCart();
  const router = useRouter();
  const [promoVisible, setPromoVisible] = useState(false);
  const handleSetPromoVisible = () => {
    setPromoVisible(!promoVisible);
  };

  const handleRemoveRedeemCode = async () => {
    const res = await CartClient.updateRedeemCode([]);
    updateCart({
      cartRes: res,
      successMessage: 'Xoá mã giảm giá thành công',
      errorMessage: 'Xoá mã giảm giá thất bại',
    });
  };

  const handleChangePromo = async (code) => {
    setPromoVisible(false);
    const res = await CartClient.updateRedeemCode([code]);
    updateCart({
      cartRes: res,
      successMessage: 'Thêm mã giảm giá thành công',
      errorMessage: 'Thêm mã giảm giá thất bại',
    });
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
            <Typography className={clsx(styles.number, styles.quantity)}>
              {formatNumber(itemCount)}
            </Typography>
          </Grid>
          <Grid
            xs={6}
            className={clsx(styles.wrapper, styles.text_right, styles.total_border)}
            item
          >
            <Typography className={styles.text}>Tổng tiền</Typography>
            <Typography className={clsx(styles.number, styles.price)}>
              {formatCurrency(subTotalPrice || 0)}
            </Typography>
            {!isEmpty(redeemCode) && (
              <Typography className={clsx(styles.total)}>{formatCurrency(totalPrice)}</Typography>
            )}
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
            <div className={styles.promo_left}>
              <LocalOffer className={styles.icon_promo} />
              <Typography onClick={handleSetPromoVisible} className={styles.counpon_button}>
                {!isEmpty(redeemCode) ? redeemCode[0] : 'Dùng mã khuyến mãi'}
              </Typography>
            </div>
            {!isEmpty(redeemCode) ? <DeleteIconButton onClick={handleRemoveRedeemCode} /> : <div />}
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
          totalPrice={totalPrice}
        />
      </Grid>
      {router.pathname === CART_URL && (
        <Grid className={styles.wrapper} xs={12} container item>
          <LinkComp
            className={clsx(styles.counpon_button, styles.quick_link)}
            name="< Tiếp tục đặt hàng"
            href={QUICK_ORDER}
            color="#00b46e"
          />
        </Grid>
      )}
    </div>
  );
};

export default CardInfo;
