import { Card, Grid, Typography } from '@material-ui/core';
import { Button } from 'components/atoms';
import Image from 'next/image';
import { PROMO_TYPE } from 'constants/Enums';
import clsx from 'clsx';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const CounponCard = ({
  code = '',
  value = '20.000 đ',
  minValue = '30.000 đ',
  type = PROMO_TYPE.COMBO,
  remain = new Date(Date.now()),
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
          {type === PROMO_TYPE.COMBO && (
            <Image
              width={60}
              height={60}
              src="https://assets.thuocsi.vn/assets/defaults/qua_tang-d6b9623d40a9924ac56d42815f5ed983f93ef06a88ec91c36261bb3bbb222553.jpg"
            />
          )}
          {type === PROMO_TYPE.GIFT && (
            <Image
              width={60}
              height={60}
              src="https://assets.thuocsi.vn/assets/defaults/qua_tang-d6b9623d40a9924ac56d42815f5ed983f93ef06a88ec91c36261bb3bbb222553.jpg"
            />
          )}
          {type === PROMO_TYPE.DISCOUNT && (
            <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{value} </div>
          )}
          <br />
          {type === PROMO_TYPE.COMBO && 'COMBO'}
          {type === PROMO_TYPE.GIFT && 'Quà Tặng'}
          {type === PROMO_TYPE.DISCOUNT && 'Giảm giá'}
        </div>
        <div style={{ display: 'flex' }}>
          <CountdownTimer prefix="Còn" dealEndDay={remain} />
        </div>
      </Grid>
      <Grid item container xs={8}>
        <Grid item xs={12}>
          <div className={styles.coupon_description}>
            <Typography variant="h6" style={{ fontSize: 'large' }}>
              {' '}
              {type === PROMO_TYPE.DISCOUNT && `GIẢM ${value}`}
              {type === PROMO_TYPE.GIFT && value}
            </Typography>
            <div> {type === PROMO_TYPE.DISCOUNT && `cho đơn hàng tối thiểu ${minValue} đ`}</div>
          </div>
        </Grid>
        <Grid item className={styles.code} xs={12}>
          {code}
        </Grid>

        <Grid item xs={12}>
          <Button className="promo__button"> Đặt hàng ngay</Button>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);

export default CounponCard;
