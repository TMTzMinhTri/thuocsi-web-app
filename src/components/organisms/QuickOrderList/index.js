import React, { useState, useEffect } from 'react';
import { isValid, SearchClient } from 'clients';
import { debounceFunc500 } from 'utils/debounce';
import { Pagination } from '@material-ui/lab';
import { PAGE_SIZE } from 'constants/data';
import { SearchOrder } from 'components/mocules';
import ProductCardHorizontal from '../ProductCardHorizontal';

import styles from './style.module.css';

const QuickOrderList = ({ products, isMobile, page, total }) => {
  const [searchProduct, setSearchProduct] = useState(products);
  const [totalVal, setTotalVal] = useState(total);
  const [keyword, setKeyword] = useState('');
  const [numPage, setNumPage] = useState(page || 1);
  const [pages, setPages] = useState(page || 1);

  useEffect(() => {
    if (keyword === '') {
      setSearchProduct(products);
    }
  }, []);

  useEffect(() => {
    setPages(Math.ceil(totalVal / PAGE_SIZE));
  }, [totalVal]);

  const fetchData = async (keywords, num) => {
    const res = await SearchClient.searchProducts(keywords, num);
    if (isValid(res)) {
      setTotalVal(res.total);
      setSearchProduct(res.data);
    } else {
      setTotalVal(0);
      setSearchProduct(null);
    }
  };

  const handleSearchbox = (e) => {
    const { value } = e.target;
    setKeyword(value);
    setNumPage(1);
    debounceFunc500(() => fetchData(value, 1));
  };

  const handleChangePage = (event, value) => {
    setNumPage(value);
    debounceFunc500(() => fetchData(keyword, value));
  };

  return (
    <>
      <div className={styles.search_input}>
        <SearchOrder onSearch={handleSearchbox} isMobile={isMobile} />
      </div>
      {searchProduct ? (
        <>
          {searchProduct.map(
            (item) =>
              item && (
                <ProductCardHorizontal
                  key={`search-product-${item.skuId}`}
                  product={item}
                  isMobile={isMobile}
                  type="quick-order"
                />
              ),
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
