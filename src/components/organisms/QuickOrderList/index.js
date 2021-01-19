import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { SearchClient } from 'clients';
import debounce from 'utils/debounce';
import ProductCardHorizontal from '../ProductCardHorizontal';
import { SearchOrder } from '../../mocules';

import styles from './style.module.css';

const QuickOrderList = ({ products, isMobile }) => {
  const [searchProduct, setSearchProduct] = useState(products);
  const [keyword, setKeyword] = useState('');

  const handler = debounce((cb) => cb(), 500);
  const handleSearchbox = (e) => {
    setKeyword(e.target.value);
    const fetchData = async () => {
      const res = await SearchClient.searchKeywords(e.target.value);
      if (res.length !== 0) {
        setSearchProduct(res[0].products);
      } else {
        setSearchProduct(false);
      }
    };
    if (e.target.value.length === 0) {
      handler(() => setSearchProduct(products));
    } else {
      handler(fetchData);
    }
  };
  return (
    <>
      {!isMobile
    && (
    <Box className={styles.search_input}>
      <SearchOrder onSearch={handleSearchbox} />
    </Box>
    )}
      {searchProduct ? searchProduct.map((item) => (
        <ProductCardHorizontal key={item.id} product={item} />
      )) : (
        <div className={styles.notFound}>Không có sản phẩm với từ khóa {`"${keyword}"`}</div>
      )}
    </>
  );
};

export default QuickOrderList;
