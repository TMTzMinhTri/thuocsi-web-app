import { Card, Grid } from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';
import { PROMO_TYPE, PROMO_RULE_TYPE } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
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
  background-color: #ffc75f !important;
  border: 1px solid #ffc75f !important;
  padding: 4px 10px !important;
  transition: 0.5s;
  opacity: 0.65;
`;

const CartCounponCard = ({
  code = '',
  promotionName = '',
  promotionType: type = PROMO_TYPE.COMBO,
  expiredDate,
  rule = {},
  redeemCode = [],
  handleChangePromo,
  totalPrice = 0,
}) => {
  const { type: ruleType = PROMO_RULE_TYPE.VALUE, conditions = [] } = rule;
  let maxDiscountValue = 0;
  let discountValue = 0;
  let percent = 0;
  // @TODO: datle
  if (conditions.length !== 0) {
    maxDiscountValue = conditions[0]?.maxDiscountValue || 0;
    discountValue = conditions[0]?.discountValue || 0;
    percent = conditions[0]?.percent || 0;
  }

  const getBenefitAvatar = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT)
      return <Image width={60} height={60} src={GIFT_IMAGE} />;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_RULE_TYPE.VALUE || ruleType === PROMO_RULE_TYPE.ABSOLUTE)
      return (
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {formatCurrency(String(discountValue))}
        </div>
      );
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_RULE_TYPE.PERCENT)
      return (
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {`Giảm ${percent}% Tối đa ${formatCurrency(String(maxDiscountValue))}`}
        </div>
      );
    return '';
  };

  const getTitle = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT) return promotionName;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_RULE_TYPE.VALUE || type === PROMO_RULE_TYPE.ABSOLUTE)
      return `GIẢM ${formatCurrency(discountValue)}`;
    if (type === PROMO_TYPE.VOUCHERCODE && ruleType === PROMO_RULE_TYPE.PERCENT)
      return `GIẢM ${percent}% TỐI ĐA ${formatCurrency(maxDiscountValue)}`;
    return '';
  };
  const caculatePrice = () => {
    if (ruleType === PROMO_RULE_TYPE.VALUE || ruleType === PROMO_RULE_TYPE.ABSOLUTE) return totalPrice - discountValue;
    if (ruleType === PROMO_RULE_TYPE.PERCENT)
      return Math.max(totalPrice - (totalPrice * percent) / 100, totalPrice - maxDiscountValue);
    return totalPrice;
  };
  return (
    <Card
      className={clsx(
        styles.coupon_card,
        type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green,
      )}
    >
      <Grid container direction="row" spacing={3} styles={{ width: '100%' }}>
        <Grid item xs={4}>
          <div className={styles.benefit}>
            {getBenefitAvatar()}
            {type === PROMO_TYPE.COMBO && 'COMBO'}
            {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
            {type === PROMO_TYPE.VOUCHERCODE && 'Giảm giá'}
          </div>
        </Grid>
        <Grid item xs={4} container direction="column">
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
            <Grid item className={styles.text_danger}>
              Đơn hàng sau khi áp dụng <strong> {formatCurrency(String(caculatePrice()))} </strong>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4} container direction="column" alignItems="center">
          <Grid item className={styles.code}>
            {code}
          </Grid>

          <Grid item>
            {String(code) === redeemCode[0] ? (
              <UsedButton> Đang dùng </UsedButton>
            ) : (
              <UseButton onClick={() => handleChangePromo(String(code))}>Dùng ngay</UseButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartCounponCard;
