import React, { memo, useState, useEffect } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { WEB_STYLES } from 'styles';
import { SearchClient } from 'clients';

import SearchDropdown from '../SearchDropdown';
import styles from './styles.module.css';

const SearchInput = memo(({ classCustom, ...restProps }) => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await SearchClient.searchKeywords();
      setSearchProduct(res);
    };
    fetchData();
  }, [keyword]);

  const handleSearchbox = (e) => {
    setKeyword(e.target.value);
  };

  const handleFocus = (e) => {
    setKeyword(e.target.value);
  };

  const handleBlur = () => {
    setKeyword('');
  };

  return (
    <div className={clsx(styles.search_wrap, classCustom)}>
      <form>
        <TextField
          {...restProps}
          classes={{
            root: styles.root_input,
          }}
          id="keyword"
          async
          onChange={handleSearchbox}
          disable
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
              </InputAdornment>
            ),
            placeholder: 'Nhập tên thuốc, hoạt chất cần tìm...',
            autoComplete: 'off',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      {keyword && <><SearchDropdown keyword={keyword} data={searchProduct} /></>}
    </div>

  );
});

export default SearchInput;
