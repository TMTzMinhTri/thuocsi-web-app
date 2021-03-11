import React, { useState, useCallback } from 'react';
import { CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Delete, Close } from '@material-ui/icons';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import clsx from 'clsx';
import useModal from 'hooks/useModal';
import { useCart, useAuth } from 'context';
import debounce from 'utils/debounce';
import { CustomModal } from 'components/mocules';
import { MinusButton, PlusButton, InputProduct, Button as CustomButton } from 'components/atoms';
import DealSection from 'components/mocules/DealSection';
import RemoveProductModal from '../RemoveProductModal';
import ErrorQuantityCartModal from '../ErrorQuantityCartModal';

import styles from './styles.module.css';

const IMPORTANT_PERCENT_MAX = 20 / 100;

const ProductCardBuy = ({
  maxQuantity: productMaxQuantity,
  not_support_delivery: noSupportDelivery,
  price,
  // dealPrice,
  isDeal = false,
  deal = {},
  row,
  type,
  searchInput,
  cart,
  id,
  name,
  product,
  isMobile,
  cartItems,
}) => {
  const maxQuantity = isDeal ? deal.maxQuantity : productMaxQuantity;
  const [value, setValue] = useState(product.quantity || 0);
  const { isAuthenticated, toggleLogin } = useAuth();
  const [isShowModalWarning, toggleWarning] = useModal();
  const importantList = cartItems?.filter((item) => item.isImportant);

  const [isShowModalRemove, toggleRemove] = useModal();
  const [isShowModalErrorQuantity, toggleErrorQuantity] = useModal();
  const { updateCartItem, removeCartItem } = useCart();
  const removeProductOutCart = () => {
    toggleRemove();
  };

  const canDeleteProduct = () => {
    const quantityAfterDel = cartItems.length - 1;
    let importantQuantity = importantList.length;
    const importantQuantityMax = Math.floor(quantityAfterDel * IMPORTANT_PERCENT_MAX);

    if (product.isImportant) importantQuantity -= 1;

    return !(importantQuantity > importantQuantityMax);
  };

  const handleRemove = () => {
    if (canDeleteProduct()) {
      removeCartItem(product);
    } else {
      toggleRemove();
      toggleWarning();
    }
  };

  const updateCart = async (q) => {
    const response = await updateCartItem({ product, q: parseInt(q, 10) });
    if (response.status === 'OK') {
      setValue(q);
    }
    if (response.errorCode === 'CART_MAX_QUANTITY') {
      setValue(maxQuantity);
    }
  };

  const handleCart = (val, updateType) => {
    if (updateType === 'remove') {
      removeCartItem(val);
      setValue(0);
    }
    if (updateType === 'update') {
      updateCart(val);
    }
  };

  const handler = useCallback(
    debounce((val, updateType) => handleCart(val, updateType), 500),
    [],
  );

  const handleDecrease = () => {
    if (value < 1) return;

    const q = parseInt(value, 10) - 1;
    setValue(q);
    if (q < 1) {
      handler(product, 'remove');
      return;
    }
    handler(q, 'update');
  };

  const handleIncrease = () => {
    const q = parseInt(value, 10) + 1;
    setValue(q);
    handler(q, 'update');
  };

  const handleInputChange = (e) => {
    if (/^\d+$/.test(e.currentTarget.value) || !e.currentTarget.value) {
      const curValue = parseInt(e.currentTarget.value || 0, 10);
      setValue(curValue);
      if (!curValue || curValue === 0) {
        if (value === 0) return;
        handler(product, 'remove');
      } else {
        handler(+curValue, 'update');
      }
    }
  };

  return (
    <>
      {isDeal && row && (
        <DealSection
          dealEndDay={deal?.endTime}
          totalSold={deal.quantity}
          total={deal.maxQuantity}
        />
      )}
      {noSupportDelivery && row ? (
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{ marginBottom: '16px' }}
            className={
              row ? styles.price_wrapper : clsx(styles.price_wrapper, styles.price_wrapper_column)
            }
          >
            <Typography className={styles.deal_price}>{formatCurrency(price)}</Typography>
          </div>
          <Typography textAlign="center" className={clsx(styles.text_danger, styles.center)}>
            Chưa hỗ trợ giao tỉnh
          </Typography>
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <>
              {isDeal ? (
                <div
                  className={
                    row
                      ? styles.price_wrapper
                      : clsx(styles.price_wrapper, styles.price_wrapper_column)
                  }
                >
                  <Typography className={styles.deal_price}>
                    {formatCurrency(deal?.discount?.absoluteDiscount)}
                  </Typography>
                  <Typography className={styles.old_price}>{formatCurrency(price)}</Typography>
                </div>
              ) : (
                <div
                  className={
                    row
                      ? styles.price_wrapper
                      : clsx(styles.price_wrapper, styles.price_wrapper_column)
                  }
                >
                  <Typography className={styles.deal_price}>{formatCurrency(price)}</Typography>
                </div>
              )}
              {!isMobile && maxQuantity ? (
                <Typography
                  className={
                    row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)
                  }
                >
                  Đặt tối đa {formatNumber(maxQuantity)} sản phẩm
                </Typography>
              ) : null}
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
                  onChange={handleInputChange}
                  searchInput={searchInput}
                  type={type}
                  value={value}
                  name={name}
                  className={value > 0 && styles.has_item}
                />
                <PlusButton
                  disabled={maxQuantity && value >= maxQuantity}
                  onClick={() => handleIncrease()}
                />
                {cart && (
                  <Tooltip title="Xoá sản phẩm">
                    <IconButton className={styles.remove_icon} onClick={removeProductOutCart}>
                      {isMobile ? (
                        <Close className={styles.icon} />
                      ) : (
                        <Delete className={styles.icon} />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
              {isMobile && maxQuantity ? (
                <Typography
                  className={
                    row ? styles.text_danger : clsx(styles.text_danger_column, styles.text_danger)
                  }
                >
                  Đặt tối đa {formatNumber(maxQuantity)} sản phẩm
                </Typography>
              ) : null}
            </>
          ) : (
            <div className={styles.view_signin_btn}>
              <CustomButton
                color="#fff"
                backgroundColor="#00b46e"
                className={styles.signin_btn}
                onClick={toggleLogin}
              >
                Đăng nhập để xem giá
              </CustomButton>
            </div>
          )}
        </>
      )}
      <RemoveProductModal
        product={product}
        visible={isShowModalRemove}
        onClose={toggleRemove}
        onRemove={handleRemove}
      />
      <CustomModal
        onClose={toggleWarning}
        visible={isShowModalWarning}
        title="Xin xác nhận"
        content="Số lượng sản phẩm hiện không thỏa điều kiện để đánh dấu quan trọng. Vui lòng bỏ đánh dấu để tiếp tục xóa"
        btnOnClose="OK"
      />
      <ErrorQuantityCartModal
        product={product}
        visible={isShowModalErrorQuantity}
        onClose={toggleErrorQuantity}
      />
    </>
  );
};
export default ProductCardBuy;
