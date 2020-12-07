import React from 'react';
import { CardActions, Typography, Box } from '@material-ui/core';
import formatCurrency from 'utils/FormarCurrency';
import { MinusButton, PlusButton, InputComp } from '../../atoms';

import styles from './styles.module.css';

const ProductCardBuy = ({
  max_product: maxProduct,
  not_support_delivery: noSupportDelivery,
  price,
  deal_price: dealPrice,
  hasEvent,
}) => (
  <>
    {noSupportDelivery ? (
      <Typography className={styles.text_danger}>Chưa hỗ trợ giao tỉnh</Typography>
    ) : (
      <>
        {hasEvent ? (
          <Box className={styles.price_wrapper}>
            <Typography className={styles.deal_price}>{formatCurrency(dealPrice)}</Typography>
            <Typography className={styles.old_price}>{formatCurrency(price)}</Typography>
          </Box>
        ) : (
          <Box className={styles.price_wrapper}>
            <Typography className={styles.deal_price}>{formatCurrency(price)}</Typography>
          </Box>
        )}
        {maxProduct > 0 && (
          <Typography className={styles.text_danger}>Đặt tối đa {maxProduct} sản phẩm</Typography>
        )}
        <CardActions className={styles.product_action}>
          <MinusButton />
          <InputComp />
          <PlusButton />
        </CardActions>
      </>
    )}
  </>
);

export default ProductCardBuy;
