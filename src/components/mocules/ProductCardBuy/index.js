import React from 'react';
import { CardActions, Typography, Box, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import formatCurrency from 'utils/FormarCurrency';
import clsx from 'clsx';
import useModal from 'hooks/useModal';
import { useCart } from 'context';
import { MinusButton, PlusButton, InputProduct } from '../../atoms';
import DealSection from '../DealSection';
import RemoveProductModal from '../../organisms/RemoveProductModal';
import styles from './styles.module.css';

const ProductCardBuy = ({
  max_product: maxProduct,
  not_support_delivery: noSupportDelivery,
  price,
  dealPrice,
  hasEvent,
  deal_end_day: dealEndDay,
  row,
  type,
  searchInput,
  cart,
  id,
  // onRemove,
  onChange,
  // onIncrement,
  // onDecrement,
  name,
  product,
  // value,
}) => {
  const [isShowModalRemove, toggleRemove] = useModal();
  const {
    increase,
    decrease,
    removeProduct,
    // increaseBy,
  } = useCart();
  const removeProductOutCart = () => {
    toggleRemove();
  };
  const handleRemove = () => {
    removeProduct(product);
  };
  const handleDecrease = () => {
    if (cart && product.quantity < 2) return;
    decrease(product);
  };
  return (
    <>
      {hasEvent && row && <DealSection dealEndDay={dealEndDay} />}
      {noSupportDelivery && row ? (
        <Box mb={2}>
          <Box
            mb={2}
            className={
              row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)
            }
          >
            <Typography className={styles.deal_price}>{formatCurrency(price)}</Typography>
          </Box>
          <Typography textAlign="center" className={clsx(styles.text_danger, styles.center)}>
            Chưa hỗ trợ giao tỉnh
          </Typography>
        </Box>
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
            Đặt tối đa {price} sản phẩm
          </Typography>
          )}
          <CardActions
            className={
              row
                ? styles.product_action
                : clsx(styles.product_action, styles.product_action_column)
            }
          >
            <MinusButton onClick={handleDecrease} />
            <InputProduct
              product={product}
              id={id}
              onChange={onChange}
              searchInput={searchInput}
              type={type}
              value={product && product.quantity && product.quantity}
              name={name}
            />
            <PlusButton onClick={() => increase(product)} />
            {cart && (
            <IconButton onClick={removeProductOutCart}>
              <Delete className={styles.icon} />
            </IconButton>
            )}
          </CardActions>
        </>
      )}
      <RemoveProductModal
        product={product}
        visible={isShowModalRemove}
        onClose={toggleRemove}
        onRemove={handleRemove}
      />
    </>
  );
};
export default ProductCardBuy;
