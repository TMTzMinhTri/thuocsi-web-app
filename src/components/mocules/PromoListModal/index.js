import React, { memo, useState, useEffect } from 'react';
import { Modal, Input, Button } from 'components/atoms';
import { Grid, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import CartCouponCard from '../CartCouponCard';
import styles from './style.module.css';

const TEXT_DEFAULT = '';

const searchString = (arr, str) => {
  const result = arr.filter((el) => el.code.indexOf(str) > -1);
  return result;
};

const FindButton = ({ className }) => <Button className={className}> Tìm </Button>;

const StyledButton = styled(FindButton)`
  color: #fff !important;
  background-color: #17a2b8 !important;
  border: 1px solid #17a2b8 !important;
  border-radius: 0 !important;
  margin-right: 0 !important;
  margin-top: 16px !important;
`;

const StyledInput = styled(Input)`
  padding: 0 0 0 10px !important;
  height: calc(1.75em + 0.5rem + 2px);
  border-radius: 0 !important;
`;

const PromoListModal = memo((props) => {
  const { onClose, visible, className, restProps, promos, handleChangePromo, promo } = props;
  const [text, setText] = useState(TEXT_DEFAULT);
  const [promoSearchs, setPromoSearchs] = useState([]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleRemoveText = () => {
    setText(TEXT_DEFAULT);
  };
  useEffect(() => {
    setPromoSearchs(promos);
  }, [promos]);

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
            <StyledInput
              endAdornment={
                text === '' ? null : (
                  <CloseIcon onClick={handleRemoveText} />
                )
              }
              placeholder="Nhập mã cần tìm"
              value={text}
              onChange={handleChangeText}
            />
          </Grid>

          <Grid item xs={2}>
            <StyledButton />
          </Grid>
        </Grid>
        <div className={styles.counpon_list}>
          <Grid container spacing={1}>
            {promoSearchs.map((pro) => (
              <Grid item key={pro.code}>
                <CartCouponCard {...pro} handleChangePromo={handleChangePromo} promo={promo} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Modal>
  );
});

export default PromoListModal;
