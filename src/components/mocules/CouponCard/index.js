import { Card, Grid, Typography } from '@material-ui/core';
import { Button, LinkComp } from 'components/atoms';
import Image from 'next/image';
import { PROMO_TYPE } from 'constants/Enums';
import { GIFT_IMAGE } from 'constants/Images';
import { QUICK_ORDER } from 'constants/Paths';
import clsx from 'clsx';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const CounponCard = ({
  promotionCode: code = '',
  promotionName = '',
  minValue = '',
  promotionType: type = PROMO_TYPE.COMBO,
  endTime = new Date(Date.now()),
}) => (
  <Card
    className={clsx(
      styles.coupon_card,
      type === PROMO_TYPE.COMBO ? styles.coupon_yellow : styles.coupon_green,
    )}
  >
    <Grid container direction="row" spacing={3}>
      <Grid item xs={4}>
        <div className={styles.benefit}>
          {type === PROMO_TYPE.COMBO && <Image width={60} height={60} src={GIFT_IMAGE} />}
          {type === PROMO_TYPE.GIFT && <Image width={60} height={60} src={GIFT_IMAGE} />}
          {type === PROMO_TYPE.DISCOUNT && (
            <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{promotionName} </div>
          )}
          <br />
          {type === PROMO_TYPE.COMBO && 'COMBO'}
          {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
          {type === PROMO_TYPE.VOUCHERCODE && 'Giảm giá'}
        </div>
        <div style={{ display: 'flex' }}>
          <CountdownTimer prefix="Còn" dealEndDay={endTime} />
        </div>
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <div className={styles.coupon_description}>
            <Typography variant="h6" style={{ fontSize: 'large' }}>
              {/* {type === PROMO_TYPE.DISCOUNT && `GIẢM ${value}`}
              {type === PROMO_TYPE.GIFT && value} */}
              {promotionName}
            </Typography>
            <div> {type === PROMO_TYPE.DISCOUNT && `cho đơn hàng tối thiểu ${minValue} đ`}</div>
          </div>
        </Grid>
        <Grid item className={styles.code} xs={12}>
          {code}
        </Grid>

        <Grid item xs={12}>
          <LinkComp href={QUICK_ORDER}>
            <Button className="promo__button"> Đặt hàng ngay</Button>
          </LinkComp>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default CounponCard;
