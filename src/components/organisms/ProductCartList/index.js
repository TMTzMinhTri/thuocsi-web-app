import React, { useState, useEffect } from 'react';
import { Box, Typography, TextareaAutosize, Button } from '@material-ui/core';
import { Star, Info } from '@material-ui/icons';
import useModal from 'hooks/useModal';

import ConfirmModal from '../ConfirmModal';
import ErrorModal from '../ErrorModal';
import RemoveProductModal from '../RemoveProductModal';
import ProductCart from '../ProductCart';
import styles from './style.module.css';

const ProductCartList = (props) => {
  const { products, setCartList } = props;
  const [isShowModal, toggle] = useModal();
  const [isShowModalWarning, toggleWarning] = useModal();
  const [isShowModalUnset, toggleUnset] = useModal();
  const [isShowModalRemove, toggleRemove] = useModal();
  const [idSelecting, setIdSelecting] = useState(null);
  const [productList, setProductList] = useState(products);
  const [form, setForm] = useState({});

  useEffect(() => {
    let newObj = {};
    products.forEach((val) => {
      newObj = {
        ...newObj,
        [val.id]: 1,
      };
    });
    setForm(newObj);
    setCartList(() => productList.map((item) => ({
      ...item,
      quantity: form[item.id] || 1,
    })));
  }, []);

  useEffect(() => {
    if (form[idSelecting] < 1) {
      setForm({
        ...form,
        [idSelecting]: 1,
      });
      toggleRemove();
    }

    setCartList(() => productList.map((item) => ({
      ...item,
      quantity: form[item.id] || 1,
    })));
  }, [form]);

  const handleShowModal = (id) => {
    setIdSelecting(id);
    const filterItem = productList.find((item) => item.id === id);
    if (filterItem?.isImportant === true) {
      toggleUnset();
    } else {
      toggle();
    }
  };

  const handleSetImportant = () => {
    const tmpProducts = productList.map((item) => {
      if (item.id === idSelecting) {
        const isImportant = item.isImportant ? !item.isImportant : true;
        return { ...item, isImportant };
      }
      return item;
    });
    setProductList([...tmpProducts]);
    toggle();
  };

  const handleErr = () => {
    const importantList = productList.filter((item) => item.isImportant === true);

    const filterItem = productList.find((item) => item.id === idSelecting);

    if (filterItem?.isImportant === false || filterItem?.isImportant === undefined) {
      if (importantList.length >= (Math.floor((productList.length * 20) / 100) || 1)) {
        toggleWarning();
        toggle();
      } else {
        handleSetImportant();
      }
    } else {
      handleSetImportant();
    }
  };

  const handleRemove = (id) => {
    const newList = productList.filter((item) => item.id !== id);
    const newForm = { ...form };
    delete newForm[id];

    setProductList(newList);
    setForm(newForm);
    toggleRemove();
  };

  const handleUnsetImportant = () => {
    const tmpProducts = productList.map((item) => {
      if (item.id === idSelecting) {
        const isImportant = item.isImportant ? !item.isImportant : true;
        return { ...item, isImportant };
      }
      return item;
    });
    setProductList(tmpProducts);
    toggleUnset();
  };

  const handleShowModalDelete = (id) => {
    setIdSelecting(id);
    toggleRemove();
  };

  const handleOnChange = (e, id) => {
    const { value } = e.target;
    setForm({
      ...form,
      [id]: parseInt(value, 10),
    });
  };

  const handleDecrement = (id) => {
    setIdSelecting(id);
    if (form[id] >= 1) {
      setForm({
        ...form,
        [id]: form[id] - 1,
      });
    }
  };

  const handleIncrement = (id) => {
    setIdSelecting(id);

    setForm({
      ...form,
      [id]: form[id] + 1,
    });
  };

  return (
    <>
      <RemoveProductModal setForm={setForm} id={idSelecting} onRemove={handleRemove} visible={isShowModalRemove} onClose={toggleRemove} />
      <ErrorModal visible={isShowModalWarning} onClose={toggleWarning} />
      <ConfirmModal onClickOk={handleErr} visible={isShowModal} onClose={toggle} />
      <ConfirmModal unset onClickOk={handleUnsetImportant} visible={isShowModalUnset} onClose={toggleUnset} />

      <Box className={styles.instruction_text}>
        <Star className={styles.star_icon} />
        <Typography>
          Nhấp để đánh dấu sản phẩm quan trọng (giới hạn 20% tổng số sản phẩm, 1 sản phẩm đặt nhiều
          cái cũng tính là 1)
        </Typography>
      </Box>
      <Box mb={2}>
        {productList.map((item) => (
          <ProductCart
            onClickShowModal={handleShowModal}
            key={`product-cart-${item.id}`}
            product={item}
            onRemove={handleShowModalDelete}
            onChange={handleOnChange}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            form={form}
          />
        ))}
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
