import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SearchClient } from 'clients';
import debounce from 'utils/debounce';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import ProductCardHorizontal from '../ProductCardHorizontal';
import { PAGE_SIZE } from '../../../constants/data';
import { SearchOrder } from '../../mocules';

import styles from './style.module.css';

const QuickOrderList = ({ products, isMobile, page, total }) => {
  const [searchProduct, setSearchProduct] = useState(products);
  const [totalVal, setTotal] = useState(total);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [numPage, setNumPage] = useState(page || 1);
  const pages = Math.ceil(totalVal / PAGE_SIZE);

  useEffect(() => {
    setSearchProduct(products);
  }, [products]);

  const handleChangePage = (event, value) => {
    if (page === value) return;
    router.push(
      {
        pathname: '/quick-order',
        query: { page: value },
      },
      { shallow: true },
    );
    setNumPage(value);
  };

  const handler = debounce((cb) => cb(), 500);
  const handleSearchbox = (e) => {
    setKeyword(e.target.value);
    const fetchData = async () => {
      const res = await SearchClient.searchProducts(e.target.value, numPage);
      if (res.length !== 0) {
        setNumPage(1);
        setTotal(res.total);
        setSearchProduct(res.data);
      } else {
        setNumPage(1);
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
      {!isMobile && (
        <Box className={styles.search_input}>
          <SearchOrder onSearch={handleSearchbox} />
        </Box>
      )}
      {searchProduct ? (
        <>
          {searchProduct.map((item) => (
            <ProductCardHorizontal key={item.id} product={item} />
          ))}
          <div className={styles.pagging}>
            <Pagination
              count={pages}
              defaultPage={numPage}
              boundaryCount={2}
              onChange={handleChangePage}
            />
          </div>
        </>
      ) : (
        <div className={styles.notFound}>Không có sản phẩm với từ khóa {`"${keyword}"`}</div>
      )}
    </>
  );
};

export default QuickOrderList;
