import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { LocalOffer } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { useCart } from 'context';
import formatCurrency from 'utils/FormarCurrency';
import { PromoClient } from 'clients';
import { LinkComp } from '../../atoms';
import PromoListModal from '../PromoListModal';
import styles from './style.module.css';

const PROMO_CODE_DEFAULT = '';

const CardInfo = ({ cart, promo: pr, className }) => {
  const { itemCount, total } = useCart();
  const [promoVisible, setPromoVisible] = useState(false);
  const [promos, setPromos] = useState([]);
  const [promo, setPromo] = useState(PROMO_CODE_DEFAULT);
  const handleSetPromoVisible = () => {
    setPromoVisible(!promoVisible);
  };

  const handleChangePromo = (value) => {
    setPromo(value);
    setPromoVisible(false);
  };

  const handleRemovePromo = () => {
    setPromo(PROMO_CODE_DEFAULT);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await PromoClient.getPromos();
      setPromos(data);
      const isHavePromo = data.filter((dt) => dt.isUsed);
      if (isHavePromo) {
        setPromo(isHavePromo[0].code);
      }
    }
    fetchData();
  }, []);

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
      {pr && (
        <Grid className={clsx(styles.wrapper, styles.promo_border)} xs={12} container item>
          <LocalOffer className={styles.icon_promo} />
          <Typography onClick={handleSetPromoVisible} className={styles.counpon_button}>
            {promo || 'Dùng mã khuyến mãi'}
          </Typography>
          {promo ? <DeleteIcon onClick={handleRemovePromo} /> : <></>}
        </Grid>
      )}
      <Grid className={styles.wrapper} xs={12} container item>
        {cart ? (
          <LinkComp href="/payment" className={styles.btn}>
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
        promos={promos}
        handleChangePromo={handleChangePromo}
      />
    </Grid>
  );
};

export default CardInfo;
