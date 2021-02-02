import React, { useState, useCallback } from 'react';
import { Typography, TextareaAutosize } from '@material-ui/core';
import Link from 'next/link';
import { Star, Info } from '@material-ui/icons';
import { NotifyUtils } from 'utils';
import { CartClient, isValid } from 'clients';
import { QUICK_ORDER } from 'constants/Paths';
import { useCart } from 'context';
import { debounceFunc500 } from 'utils/debounce';
import ProductCart from '../ProductCart';
import styles from './style.module.css';

const ProductCartList = ({ products, isMobile }) => {
  const { note: noteC, updateCart } = useCart();
  const [note, setNote] = useState(noteC);

  // TODO:
  const handleUpdateNote = useCallback(async (noteVal) => {
    try {
      const res = await CartClient.updateNote(noteVal);
      if (!isValid(res)) throw new Error(res.messsage);
      updateCart();
      NotifyUtils.success('Cập nhật ghi chú thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật ghi chú thất bại');
    }
  });

  // TODO:
  const handleChangeNote = (e) => {
    const noteVal = e.target.value;
    setNote(noteVal);
    debounceFunc500(() => handleUpdateNote(noteVal));
  };

  return (
    <>
      <div className={styles.instruction_text}>
        <Star className={styles.star_icon} />
        <Typography>
          Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt nhiều
          cái cũng tính là 1)
        </Typography>
      </div>
      <div style={{ marginBottom: '16px' }}>
        {products &&
          products.map((item) => (
            <ProductCart
              key={`product-cart-${item.sku}`}
              product={item}
              isImportant={item.isImportant}
              name={`cart-${item.sku}`}
              isMobile={isMobile}
            />
          ))}
      </div>
      <div className={styles.instruction_text}>
        <Info className={styles.info_icon} />
        <Typography>
          Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang
          <Link href={QUICK_ORDER}>
            <span className={styles.quick_order}>Đặt hàng nhanh </span>
          </Link>
        </Typography>
      </div>
      <div className={styles.notes}>
        <div className={styles.note_title}>Ghi chú khác</div>
        <div className={styles.note_content}>
          Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng
          tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
        </div>

        <TextareaAutosize
          className={styles.text_area}
          aria-label="Ghi chú của khách hàng"
          placeholder="Ghi chú của khách hàng"
          rowsMax={4}
          value={note}
          onChange={handleChangeNote}
        />
      </div>
    </>
  );
};

export default ProductCartList;
