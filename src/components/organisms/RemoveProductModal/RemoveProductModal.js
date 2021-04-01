import React, { memo } from 'react';
import { Modal, ButtonDefaultLogin } from 'components/atoms';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Image from 'next/image';
import { MISSING_IMAGE } from 'constants/Images';
import { formatCurrency } from 'utils/FormatNumber';
import styles from './style.module.css';

const RemoveProductModal = memo((props) => {
  const { onClose, onRemove, visible, className, restProps, product } = props;
  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.warning_icon}>
            <Typography className={styles.text_icon}>!</Typography>
          </div>
          <Typography className={styles.modal_title}>Xin xác nhận</Typography>
          <div className={styles.modal_content_wrap}>
            <Typography className={styles.modal_content}>
              Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?
            </Typography>
          </div>
        </div>
        {product && (
          <Card className={styles.remove_item}>
            <div className={styles.remove_item_image}>
              <Image
                className={styles.remove_item_image}
                src={(product.imageUrls && product.imageUrls[0]) || MISSING_IMAGE}
                width={80}
                height={80}
                alt={product.name && product.name}
              />
            </div>
            <div className={styles.remove_item_content}>
              <div className={styles.remove_item_cart_name}>{product.name && product.name}</div>
              <div className={styles.remove_item_cart_price}>
                {product.salePrice && formatCurrency(product.salePrice)}
              </div>
            </div>
          </Card>
        )}

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <ButtonDefaultLogin btnType="warning" onClick={onClose}>
            Không
          </ButtonDefaultLogin>

          <ButtonDefaultLogin onClick={() => onRemove()}>Có</ButtonDefaultLogin>
        </div>
      </div>
    </Modal>
  );
});

export default RemoveProductModal;
