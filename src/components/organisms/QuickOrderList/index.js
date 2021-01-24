import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SearchClient } from 'clients';
import { debounceFunc500 } from 'utils/debounce';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { PAGE_SIZE } from 'constants/data';
import { SearchOrder } from 'components/mocules';
import { QUICK_ORDER } from 'constants/Paths';
import ProductCardHorizontal from '../ProductCardHorizontal';

import styles from './style.module.css';

const QuickOrderList = ({ products, isMobile, page, total }) => {
  const [searchProduct, setSearchProduct] = useState(products);
  const [totalVal, setTotalVal] = useState(total);
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
        pathname: QUICK_ORDER,
        query: { page: value },
      },
      { shallow: true },
    );
    setNumPage(value);
  };

  const handleSearchbox = (e) => {
    const { value } = e.target;
    setKeyword(value);
    setNumPage(1);
    const fetchData = async () => {
      const res = await SearchClient.searchProducts(value, numPage);
      if (res.length !== 0) {
        setTotalVal(res.total);
        setSearchProduct(res.data);
      } else {
        setSearchProduct([]);
      }
    };
    if (value.length === 0) {
      setSearchProduct(products);
      setTotalVal(total);
      setNumPage(page);
    } else {
      debounceFunc500(fetchData);
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
          {searchProduct.map(
            (item) =>
              item && <ProductCardHorizontal key={`search-product-${item.skuId}`} product={item} />,
          )}
          <div className={styles.pagging}>
            <Pagination
              count={pages}
              defaultPage={1}
              page={numPage}
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
