import React, { memo, useState, useEffect, useCallback } from 'react';
import { Modal } from 'components/atoms';
import { Grid, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getFirst, isValid } from 'clients';
import { PromoService } from 'services';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
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

  const parseConditionVoucher = useCallback((voucher) => {
    let isDisable = false;
    let message = '';
    const { conditions = [] } = voucher;
    // if (maxUsagePerCustomer && usageTotal && maxUsagePerCustomer <= usageTotal) {
    //   isDisable = true;
    //   return { ...voucher, isDisable, message: 'Đã hết lượt sử dụng' };
    // }

    conditions.forEach((condition) => {
      const { type, minOrderValue } = condition;

      switch (type) {
        case 'ORDER_VALUE':
          if (minOrderValue && totalPrice < minOrderValue) {
            isDisable = true;
            message = `Giá trị giỏ hàng cần lớn hơn ${formatCurrency(minOrderValue)}`;
          }
          break;
        default:
      }
    });

    return { ...voucher, isDisable, message };
  });

  useEffect(() => {
    async function fetchData() {
      const voucherList = await PromoService.getVoucherCodesActive({});

      // @TODO: datle rewards is only 1 now
      const voucherListParsed = voucherList
        .map((voucher) => parseConditionVoucher(voucher))
        .sort((a, b) => a.isDisable - b.isDisable);

      const prs = searchString(voucherListParsed, '');
      setPromos(prs);
      setPromoSearchs(prs);
    }
    if (visible) fetchData();
  }, [totalPrice, visible]);

  useEffect(() => {
    const prms = searchString(promos, text?.toUpperCase() || '');
    setPromoSearchs(prms);
  }, [promos, text]);

  const searchPromotionWithCode = useCallback(async () => {
    const codeSearch = text || '';
    if (!codeSearch) {
      return;
    }
    const detailRes = await PromoService.getPromoCodeDetail(codeSearch);
    if (isValid(detailRes)) {
      const promoDetail = getFirst(detailRes);
      const { code } = promoDetail;
      if (promoSearchs.filter((item) => item.code === code).length === 0) {
        const promosUpdate = promoSearchs.concat(
          [promoDetail].map((voucher) => parseConditionVoucher(voucher)),
        );
        setPromoSearchs(promosUpdate);
      }
    }
  });

  const handleSearchButton = (event) => {
    const code = event.target.value;
    if (event.key === 'Enter') {
      searchPromotionWithCode(code);
      event.preventDefault();
    }
  };

  // TODO:

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div className={styles.modal_title}>
          <h2> Mã khuyến mãi </h2>
          <CloseIcon className={styles.close} onClick={onClose} />
        </div>
        <Divider />
        <Grid container>
          <Grid item xs={9} md={10}>
            <Input
              endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} />}
              placeholder="Nhập mã cần tìm"
              value={text}
              onChange={handleChangeText}
              onKeyDown={handleSearchButton}
            />
          </Grid>

          <Grid item xs={3} md={2}>
            <Button className={styles.button} onClick={searchPromotionWithCode} />
          </Grid>
        </Grid>
        <div className={styles.counpon_list_wapper}>
          <div className={styles.counpon_list}>
            {promoSearchs.length !== 0 ? (
              <Grid container spacing={1}>
                {promoSearchs.map((voucher) => (
                  <Grid
                    className={styles.coupon_card_grid}
                    item
                    key={uuidv4()}
                    style={{ width: '100%' }}
                  >
                    <CartCouponCard
                      {...voucher}
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
