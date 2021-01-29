import { Card, Grid } from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';
import { PROMO_TYPE } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
import clsx from 'clsx';
import { Button } from 'components/atoms';
import { FormarCurrency } from 'utils';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const UseButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 22px !important;
  text-transform: none !important;
  color: #fff !important;
  background-color: #00b46e !important;
  border: 1px solid #00b46e !important;
  padding: 4px 10px !important;
  transition: 0.5s;
  &:hover {
    color: #00b46e !important;
    background-color: #fff !important;
    border-color: #00b46e !important;
  }
`;

const UsedButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 22px !important;
  text-transform: none !important;
  color: #fff !important;
  background-color: #FFC75F !important;
  border: 1px solid #FFC75F !important;
  padding: 4px 10px !important;
  transition: 0.5s;
  opacity: 0.65;
`;

const CartCounponCard = ({
  promotionCode = '',
  description = '',
  value = '',
  type = PROMO_TYPE.COMBO,
  endTime = '',
  redeemCode = '',
  handleChangePromo,
  totalPrice = 0,
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
          Đơn hàng sau khi áp dụng <strong> {FormarCurrency(totalPrice)} </strong>
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
