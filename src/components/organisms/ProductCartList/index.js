import React, { useState } from 'react';
import { Box, Typography, TextareaAutosize, Button } from '@material-ui/core';
import Link from 'next/link';
import { Star, Info } from '@material-ui/icons';
import { NotifyUtils } from 'utils';
import { CartClient, isValid } from 'clients';
import { QUICK_ORDER } from 'constants/Paths';
import { useCart } from 'context';
import ProductCart from '../ProductCart';
import styles from './style.module.css';

const ProductCartList = (props) => {
  const { products } = props;
  const { note: noteC, updateCart } = useCart();
  const [note, setNote] = useState(noteC);

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleUpdateNote = async () => {
    try {
      const res = await CartClient.updateNote(note);
      if (!isValid(res)) throw new Error(res.messsage);
      updateCart();
      NotifyUtils.success('Cập nhật ghi chú thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật ghi chú thất bại');
    }
  };
  return (
    <>
      <Box className={styles.instruction_text}>
        <Star className={styles.star_icon} />
        <Typography>
          Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt nhiều
          cái cũng tính là 1)
        </Typography>
      </Box>
      <Box mb={2}>
        {products.map((item) => (
          <ProductCart key={`product-cart-${item.sku}`} product={item} name={`cart-${item.sku}`} />
        ))}
      </Box>
      <Box className={styles.instruction_text}>
        <Info className={styles.info_icon} />
        <Typography>
          Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang
          <Link className={styles.quick_order} href={QUICK_ORDER}>
            Đặt hàng nhanh
          </Link>
        </Typography>
      </Box>
      <Box className={styles.notes}>
        <Box className={styles.note_title} mb={1} fontSize={16}>
          Ghi chú khác
        </Box>
        <Box className={styles.note_content} mb={1} fontSize={16}>
          Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới. Chúng
          tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể.
        </Box>

        <TextareaAutosize
          className={styles.text_area}
          aria-label="Ghi chú của khách hàng"
          placeholder="Ghi chú của khách hàng"
          rowsMax={4}
          value={note}
          onChange={handleChangeNote}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button className={styles.btn} onClick={handleUpdateNote}>Cập nhật ghi chú</Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductCartList;
