import React, { memo, useState, useEffect } from 'react';
import { Modal } from 'components/atoms';
import { Grid, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PromoClient } from 'clients';
import { PROMOTION_STATUS, PROMO_TYPE } from 'constants/Enums';
import { DateTimeUtils } from 'utils';
import CartCouponCard from '../CartCouponCard';
import styles from './style.module.css';
import Button from './Button';
import Input from './Input';

const TEXT_DEFAULT = '';

const searchString = (arr, str) => {
  const result = arr.filter((el) => el.promotionCode?.indexOf(str) > -1);
  return result;
};

const PromoListModal = memo((props) => {
  const {
    onClose,
    visible,
    className,
    restProps,
    redeemCode,
    handleChangePromo,
    totalPrice,
  } = props;
  const [text, setText] = useState(TEXT_DEFAULT);
  const [promoSearchs, setPromoSearchs] = useState([]);
  const [promos, setPromos] = useState([]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleRemoveText = () => {
    setText(TEXT_DEFAULT);
  };
  useEffect(() => {
    async function fetchData() {
      let data = await PromoClient.getPromosByStatus({ status: PROMOTION_STATUS.ACTIVE });
      // @TODO: datle
      data = data.filter((promo) => {
        let minOrderValue = 0;
        const { rule, promotionType, endTime } = promo;
        if (rule && rule.conditions && rule.conditions.length !== 0)
          minOrderValue = rule.conditions[0]?.minOrderValue;
        if (endTime && DateTimeUtils.compareTime(endTime, Date.now()) <= 0) return false;
        if (promotionType === PROMO_TYPE.VOUCHERCODE) return totalPrice >= minOrderValue;
        return true;
      });
      const prs = searchString(data, '');
      setPromos(prs);
      setPromoSearchs(prs);
    }
    if (visible) fetchData();
  }, [visible]);

  useEffect(() => {
    const prms = searchString(promos, text);
    setPromoSearchs(prms);
  }, [text]);
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <h2> Mã khuyến mãi </h2>
        <Divider />
        <Grid container>
          <Grid item xs={10}>
            <Input
              endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} />}
              placeholder="Nhập mã cần tìm"
              value={text}
              onChange={handleChangeText}
            />
          </Grid>

          <Grid item xs={2}>
            <Button />
          </Grid>
        </Grid>
        <div className={styles.counpon_list}>
          <Grid container spacing={1}>
            {promoSearchs.map((pro) => (
              <Grid item key={pro.promotionCode}>
                <CartCouponCard
                  {...pro}
                  redeemCode={redeemCode}
                  handleChangePromo={handleChangePromo}
                  totalPrice={totalPrice}
                />
              </Grid>
            ))}
          </Grid>
          <div className={styles.not_yet}> 
            Chưa có mã
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default PromoListModal;
