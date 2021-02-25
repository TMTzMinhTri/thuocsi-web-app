import React, { memo, useState, useEffect } from 'react';
import { Modal } from 'components/atoms';
import { Grid, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PromoService } from 'services';
import CartCouponCard from '../CartCouponCard';
import styles from './style.module.css';
import Button from './Button';
import Input from './Input';

const TEXT_DEFAULT = '';

const searchString = (arr, str) => {
  const result = arr.filter((el) => el.code?.indexOf(str) > -1);
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
      const res = await PromoService.getPromoActive({});

      // @TODO: datle rewards is only 1 now
      const promotions = res.map((promo) => {
        let isDisable = false;
        let message = '';
        const { conditions } = promo;

        conditions.forEach((condition) => {
          const { type, minOrderValue } = condition;
          switch (type) {
            case 'ORDER_VALUE':
              if (minOrderValue && totalPrice <= minOrderValue) {
                isDisable = true;
                message = `Giá trị giỏ hàng cần lớn hơn ${minOrderValue}`;
              }
              break;
            default:
          }
        });
        return { ...promo, isDisable, message };
      });

      const prs = searchString(promotions, '');
      setPromos(prs);
      setPromoSearchs(prs);
    }
    if (visible) fetchData();
  }, [visible]);

  useEffect(() => {
    const prms = searchString(promos, text);
    setPromoSearchs(prms);
  }, [text]);

  // TODO:

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <h2> Mã khuyến mãi </h2>
        <Divider />
        <Grid container>
          <Grid item xs={9} md={10}>
            <Input
              endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} />}
              placeholder="Nhập mã cần tìm"
              value={text}
              onChange={handleChangeText}
            />
          </Grid>

          <Grid item xs={3} md={2}>
            <Button className={styles.button} />
          </Grid>
        </Grid>
        <div className={styles.counpon_list_wapper}>
          <div className={styles.counpon_list}>
            {promoSearchs.length !== 0 ? (
              <Grid container spacing={1}>
                {promoSearchs.map((pro) => (
                  <Grid
                    className={styles.coupon_card_grid}
                    item
                    key={pro.code}
                    style={{ width: '100%' }}
                  >
                    <CartCouponCard
                      {...pro}
                      redeemCode={redeemCode}
                      handleChangePromo={handleChangePromo}
                      totalPrice={totalPrice}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className={styles.not_yet}>Chưa có mã</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default PromoListModal;
