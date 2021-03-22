import React, { useState } from 'react';
import { Button, Grid, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { LocalOffer } from '@material-ui/icons';
import { FormatNumber } from 'utils';
import { useCart, useAuth } from 'context';
import { useRouter } from 'next/router';
import { CART_URL, CHECKOUT_URL } from 'constants/Paths';
import clsx from 'clsx';
import PromoListModal from 'components/mocules/PromoListModal';
import { CartClient } from 'clients';
import { isEmpty } from 'utils/ValidateUtils';
import styles from '../styles.module.css';

const DeleteIconButton = (props) => (
  <IconButton {...props} style={{ padding: 0 }}>
    <DeleteIcon />
  </IconButton>
);
const FooterWithCart = () => {
  const { itemCount, updateCart, redeemCode, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [promoVisible, setPromoVisible] = useState(false);
  const handleSetPromoVisible = () => {
    setPromoVisible(!promoVisible);
  };

  const handleRemoveRedeemCode = async () => {
    const res = await CartClient.updateRedeemCode([]);
    updateCart({ cartRes: res, successMessage: 'Xoá mã giảm giá thành công' });
  };

  const handleChangePromo = async (code) => {
    setPromoVisible(false);
    const res = await CartClient.updateRedeemCode([code]);
    updateCart({ cartRes: res, successMessage: 'Thêm mã giảm giá thành công' });
  };
  return (
    <>
      {router.pathname === CART_URL && (
        <div className={styles.promo_wrapper}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Grid
              className={clsx(styles.wrapper, styles.promo_border, styles.promo_box)}
              xs={12}
              container
              item
              direction="row"
            >
              <div className={styles.left_c}>
                <LocalOffer className={styles.icon_promo} />
                <Typography onClick={handleSetPromoVisible} className={styles.counpon_button}>
                  {!isEmpty(redeemCode) ? redeemCode[0] : 'Dùng mã khuyến mãi'}
                </Typography>
              </div>
              {!isEmpty(redeemCode) ? (
                <DeleteIconButton onClick={handleRemoveRedeemCode} />
              ) : (
                <div />
              )}
            </Grid>
            <PromoListModal
              visible={promoVisible}
              onClose={handleSetPromoVisible}
              handleChangePromo={handleChangePromo}
              redeemCode={redeemCode}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      )}
      <div className={styles.fwc_wrapper}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <div className={styles.total}>{FormatNumber.formatCurrency(totalPrice)}</div>
          </div>
          <div>
            {router.pathname === CHECKOUT_URL && (
              <Link href="/checkout">
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: styles.btn_checkout,
                  }}
                  className={styles.disabled}
                  variant="outlined"
                  disabled={user.isQuest}
                >
                  Thanh toán
                </Button>
              </Link>
            )}

            {router.pathname === CART_URL && (
              <Link href="/checkout">
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: styles.btn_checkout,
                  }}
                  variant="outlined"
                  disabled={user.isQuest}
                >
                  Tiếp tục
                </Button>
              </Link>
            )}
            {router.pathname !== CART_URL && router.pathname !== CHECKOUT_URL && (
              <Link href="/cart">
                <Button
                  classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
                  variant="outlined"
                >
                  Giỏ hàng ({itemCount})
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(FooterWithCart);
