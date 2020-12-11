import React, { useState } from 'react';
import { Box, Typography, TextareaAutosize, Button } from '@material-ui/core';
import { Star, Info } from '@material-ui/icons';
import useModal from 'hooks/useModal';

import ConfirmModal from '../ConfirmModal';
import ProductCart from '../ProductCart';
import styles from './style.module.css';

const ProductCartList = ({ products }) => {
  const [isShowModal, toggle] = useModal();
  const [important, setImportant] = useState(false);
  // const [id, setId] = useState('');

  const handleSetImportant = (value) => {
    // console.log(id);
    setImportant(!value);
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
          <ProductCart
            id={`product-cart-${item.id}`}
            handleSetImportant={handleSetImportant}
            // setId={setId}
            toggle={toggle}
            setImportant={setImportant}
            important={important}
            key={`product-cart-${item.id}`}
            product={item}
          />
        ))}
        <ConfirmModal
          handleSetImportant={handleSetImportant}
          visible={isShowModal}
          onClose={toggle}
        />
      </Box>
      <Box className={styles.instruction_text}>
        <Info className={styles.info_icon} />
        <Typography>
          Để thêm sản phẩm vào giỏ hàng, vui lòng quay về trang{' '}
          <a className={styles.quick_order} href="/">
            Đặt hàng nhanh
          </a>
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
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button className={styles.btn}>Cập nhật ghi chú</Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductCartList;
