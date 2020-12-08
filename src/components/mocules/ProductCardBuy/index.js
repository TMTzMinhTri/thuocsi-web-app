import React from 'react';
import { CardActions, Typography, Box } from '@material-ui/core';
import formatCurrency from 'utils/FormarCurrency';
import clsx from 'clsx';
import { MinusButton, PlusButton, InputProduct } from '../../atoms';
import DealSection from '../DealSection';

import styles from './styles.module.css';

const ProductCardBuy = ({
  max_product: maxProduct,
  not_support_delivery: noSupportDelivery,
  price,
  deal_price: dealPrice,
  hasEvent,
  deal_end_day: dealEndDay,
  row,
  type,
}) => (
  <>
    {row && <DealSection dealEndDay={dealEndDay} />}
    {noSupportDelivery && row ? (
      <Typography className={styles.text_danger}>Chưa hỗ trợ giao tỉnh</Typography>
    ) : (
      <>
        {hasEvent ? (
          <Box
            className={
              row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)
            }
          >
            <Typography className={styles.deal_price}>{formatCurrency(dealPrice)}</Typography>
            <Typography className={styles.old_price}>{formatCurrency(price)}</Typography>
          </Box>
        ) : (
          <Box
            className={
              row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)
            }
          >
            <Typography className={styles.deal_price}>{formatCurrency(price)}</Typography>
          </Box>
        )}
        {maxProduct > 0 && (
          <Typography
            className={
              row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)
            }
          >
            Đặt tối đa {maxProduct} sản phẩm
          </Typography>
        )}
        <CardActions
          className={
            row ? styles.product_action : clsx(styles.product_action, styles.product_action_column)
          }
        >
          <MinusButton />
          <InputProduct type={type} />
          <PlusButton />
        </CardActions>
      </>
    )}
  </>
);

export default ProductCardBuy;
