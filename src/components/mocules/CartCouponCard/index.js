import { Card, Grid } from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';
import { PROMO_TYPE, PROMO_REWARD_TYPE } from 'constants/Enums';
import { GIFT_IMAGE, LOGO_NOT_MATCH_CONDITIONS } from 'constants/Images';
import clsx from 'clsx';
import { Button } from 'components/atoms';
import { formatCurrency } from 'utils/FormatNumber';
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
  background-color: #1890ff !important;
  border: 1px solid #1890ff !important;
  padding: 4px 10px !important;
  transition: 0.5s;
  opacity: 0.65;
`;

const CartCounponCard = ({
  code = '',
  promotionName = '',
  promotionType: type = PROMO_TYPE.COMBO,
  endTime: expiredDate,
  rewards = [],
  redeemCode = [],
  handleChangePromo,
  totalPrice = 0,
  isDisable,
  className,
  message,
}) => {
  let maxDiscountValue = 0;
  let discountValue = 0;
  let percent = 0;
  let ruleType = PROMO_REWARD_TYPE.ABSOLUTE;
  // @TODO: datle rewards is only 1 now
  if (rewards.length !== 0) {
    maxDiscountValue = rewards[0]?.maxDiscount || 0;
    discountValue = rewards[0]?.absoluteDiscount || 0;
    percent = rewards[0]?.percentageDiscount || 0;
    ruleType = rewards[0]?.type || PROMO_REWARD_TYPE.ABSOLUTE;
  }

  const getBenefitAvatar = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT)
      return <Image width={60} height={60} src={GIFT_IMAGE} />;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.ABSOLUTE)
      return (
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {formatCurrency(String(discountValue))}
        </div>
      );
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
      return (
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {`Giảm ${percent}% Tối đa ${formatCurrency(String(maxDiscountValue))}`}
        </div>
      );
    return '';
  };

  const getTitle = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT) return promotionName;
    if (type === PROMO_TYPE.VOUCHERCODE && type === PROMO_REWARD_TYPE.ABSOLUTE)
      return `GIẢM ${formatCurrency(discountValue)}`;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
      return `GIẢM ${percent}% TỐI ĐA ${formatCurrency(maxDiscountValue)}`;
    return '';
  };
  const caculatePrice = () => {
    if (ruleType === PROMO_REWARD_TYPE.ABSOLUTE) return totalPrice - discountValue;
    if (ruleType === PROMO_REWARD_TYPE.PERCENTAGE)
      return Math.max(totalPrice - (totalPrice * percent) / 100, totalPrice - maxDiscountValue);
    return totalPrice;
  };

  const ButtonEle =
    String(code) === redeemCode[0] ? (
      <UsedButton> Đang dùng </UsedButton>
    ) : (
      <UseButton onClick={() => handleChangePromo(String(code))}>Dùng ngay</UseButton>
    );
  return (
    <Card
      className={clsx(
        styles.coupon_card,
        type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green,
      )}
    >
      <Grid container className={className} direction="row" style={{ width: '100%' }}>
        <Grid className={styles.col_left} item container xs={12} md={9}>
          <Grid className={styles.col_left_inner} container>
            <Grid item xs={4}>
              <div className={styles.benefit}>
                {getBenefitAvatar()}
                {type === PROMO_TYPE.COMBO && 'COMBO'}
                {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
                {type === PROMO_TYPE.VOUCHERCODE && 'Giảm giá'}
              </div>
            </Grid>
            <Grid item xs={8} container direction="column">
              {type !== PROMO_TYPE.COMBO && (
                <Grid item className={styles.coupon_description}>
                  {getTitle()}
                </Grid>
              )}

              <Grid item>
                <div style={{ display: 'flex' }}>
                  {!expiredDate ? (
                    'Không giới hạn'
                  ) : (
                    <CountdownTimer prefix="Còn" dealEndDay={expiredDate} />
                  )}
                </div>
              </Grid>
              {type === PROMO_TYPE.VOUCHERCODE && (
                <Grid item className={styles.text_info}>
                  Đơn hàng sau khi áp dụng{' '}
                  <strong> {formatCurrency(String(caculatePrice()))} </strong>
                </Grid>
              )}

              {message ? (
                <Grid item className={styles.text_danger}>
                  <strong> Điều kiện : {message}</strong>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className={styles.col_right}
          item
          xs={12}
          md={3}
          container
          direction="column"
          alignItems="flex-end"
        >
          <Grid item className={styles.code}>
            {code}
          </Grid>

          <Grid item style={{ paddingTop: 10 }}>
            {isDisable ? (
              <Image src={LOGO_NOT_MATCH_CONDITIONS} width={72} height={56} />
            ) : (
              <ButtonEle />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCounponCard;
