import React from 'react';
import { CardActions, Typography } from '@material-ui/core';
import { MinusButton, PlusButton, InputComp } from 'components/atoms';
import styles from './styles.module.css';

const ProductCardBuy = ({ noSupportDelivery }) => (
  <>
    {noSupportDelivery ? (
      <Typography className={styles.not_support}>Chưa hỗ trợ giao tỉnh</Typography>
    ) : (
      <CardActions className={styles.product_action}>
        <MinusButton />
        <InputComp />
        <PlusButton />
      </CardActions>
    )}
  </>
);

export default ProductCardBuy;
