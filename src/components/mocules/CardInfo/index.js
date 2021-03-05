import React, { useState } from 'react';
import { Grid, Typography, IconButton, Tooltip } from '@material-ui/core';
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
  <Tooltip title="Xoá mã khuyến mãi">
    <IconButton {...props} style={{ padding: 0 }}>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
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
  const cartInfo = useCart();
  const {
    itemCount,
    totalPrice,
    subTotalPrice,
    updateCart,
    redeemCode,
    promoInfo,
    redeemApplyResult,
  } = cartInfo;

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

  const redeemRs = redeemApplyResult && redeemApplyResult[0];
  const { canUse: isCanApplyVoucherCode = false, message: messageApplyVoucherCode = '' } =
    redeemRs || {};

  const descriptionRewards = promoInfo?.rewardsVi.map((reward) => reward?.message || '');

  const redeemText = promoInfo ? promoInfo.code : '';

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
          <>
            <Grid
              className={clsx(styles.wrapper, styles.promo_border)}
              xs={12}
              container
              item
              direction="row"
            >
              <div className={styles.promo_left}>
                <LocalOffer className={styles.icon_promo} />
                <Tooltip title="Thay đổi mã khuyến mãi">
                  <Typography
                    onClick={handleSetPromoVisible}
                    className={clsx(
                      styles.counpon_button,
                      !isCanApplyVoucherCode && !isEmpty(redeemCode) ? styles.textLineThrought : '',
                    )}
                  >
                    {!isEmpty(redeemCode) ? redeemText : 'Dùng mã khuyến mãi'}
                  </Typography>
                </Tooltip>
              </div>
              {!isEmpty(redeemCode) && <DeleteIconButton onClick={handleRemoveRedeemCode} />}
            </Grid>
            <Grid
              className={clsx(styles.wrapper)}
              container
              justify="flex-start"
              style={{
                padding: '0px 10px 10px 15px',
                borderBottom: '1px solid rgba(195, 204, 220, 0.4)',
              }}
            >
              {!isCanApplyVoucherCode && !isEmpty(redeemCode) ? (
                <Typography style={{ fontSize: 'small' }}>
                  <i>{messageApplyVoucherCode}</i>
                </Typography>
              ) : (
                descriptionRewards && (
                  <Typography style={{ fontSize: 'small' }}>
                    <i>{descriptionRewards}</i>
                  </Typography>
                )
              )}
            </Grid>
          </>
        )}
        <Grid className={styles.wrapper} xs={12} container item>
          {cart ? (
            <PaymentButton user={user} />
          ) : (
            <LinkComp href="/cart" className={styles.btn} title="Qua lại trang giỏ hàng">
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
