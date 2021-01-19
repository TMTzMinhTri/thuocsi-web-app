import { Card, Grid } from '@material-ui/core';
import Image from 'next/image';
import { PROMO_TYPE } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
import clsx from 'clsx';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';
import UsedButton from './UsedButton';
import UseButton from './UseButton';

const CartCounponCard = ({
  promotionCode = '',
  description = '',
  value = '',
  type = PROMO_TYPE.COMBO,
  endTime = '',
  redeemCode = '',
  handleChangePromo,
}) => (
  <Card
    className={clsx(
      styles.coupon_card,
      type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green,
    )}
  >
    <Grid container direction="row" spacing={3} styles={{ width: '100%' }}>
      <Grid item xs={4}>
        <div className={styles.benefit}>
          {type === PROMO_TYPE.COMBO && <Image width={60} height={60} src={GIFT_IMAGE} />}
          {type === PROMO_TYPE.GIFT && <Image width={60} height={60} src={GIFT_IMAGE} />}
          {type === PROMO_TYPE.DISCOUNT && (
          <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{value} </div>
          )}
          <br />
          {type === PROMO_TYPE.COMBO && 'COMBO'}
          {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
          {type === PROMO_TYPE.DISCOUNT && 'Giảm giá'}
        </div>
      </Grid>
      <Grid item xs={4} container direction="column">
        {type !== PROMO_TYPE.COMBO && (
        <Grid item className={styles.coupon_description}>
          {description}
        </Grid>
        )}

        <Grid item>
          <div style={{ display: 'flex' }}>
            <CountdownTimer prefix="Còn" dealEndDay={endTime} />
          </div>
        </Grid>
        {/* {type === PROMO_TYPE.DISCOUNT && ( */}
        <Grid item className={styles.text_danger}>
          Đơn hàng sau khi áp dụng <strong> 4.108.400đ </strong>
        </Grid>
        {/* )} */}
      </Grid>

      <Grid item xs={4} container direction="column" AlignItems="center">
        <Grid item className={styles.code}>
          {promotionCode}
        </Grid>

        <Grid item>
          {String(promotionCode) === String(redeemCode) ? (
            <UsedButton> Đang dùng </UsedButton>
          ) : (
            <UseButton onClick={() => handleChangePromo(String(promotionCode))}>
              Dùng ngay
            </UseButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default CartCounponCard;
