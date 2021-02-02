import React, {useState} from 'react';
import { Button, Grid, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';
import { LocalOffer } from '@material-ui/icons';
import { FormarCurrency, NotifyUtils} from 'utils';
import { useCart } from 'context';
import { useRouter } from 'next/router';
import { CART_URL, CHECKOUT_URL } from 'constants/Paths';
import clsx from 'clsx';
import PromoListModal from 'components/mocules/PromoListModal';
import { CartClient, isValid } from 'clients';
import styles from '../styles.module.css';

const PROMO_CODE_DEFAULT = '';

const DeleteIconButton = (props) => (
  <IconButton style={{ padding: 0 }}>
    <DeleteIcon {...props} />
  </IconButton>
);
const FooterWithCart = () => {
  const { itemCount, total = 0, updateCart, redeemCode } = useCart();
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
    <>
      <div className={styles.promo_wrapper}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
          <PromoListModal
            visible={promoVisible}
            onClose={handleSetPromoVisible}
            handleChangePromo={handleChangePromo}
            redeemCode={redeemCode}
            totalPrice={total}
          />
        </div>
      </div>
      <div className={styles.fwc_wrapper}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <div className={styles.total}>{FormarCurrency(total)}</div>
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
                  variant="outlined"
                >
                  Thanh toán
                </Button>
              </Link>
            )}

            {router.pathname === CART_URL ? (
              <Link href="/checkout">
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: styles.btn_checkout,
                  }}
                  variant="outlined"
                >
                  Tiếp tục
                </Button>
              </Link>
            ) : (
              <Link href="/cart">
                <Button
                  classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
                  variant="outlined"
                >
                  Giỏ hàng ({itemCount})
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
