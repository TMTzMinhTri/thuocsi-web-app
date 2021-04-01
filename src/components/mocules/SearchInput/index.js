import React, { memo, useState } from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { WEB_STYLES } from 'styles';
import { SearchClient } from 'clients';
import { debounceFunc500 } from 'utils/debounce';

import SearchDropdown from '../SearchDropdown';
import styles from './styles.module.css';

const SearchInput = memo(({ classCustom, ...restProps }) => {
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleSearchbox = (e) => {
    setKeyword(e.target.value);
    const fetchData = async () => {
      const res = await SearchClient.searchKeywords(keyword);
      setSearchProduct(res);
    };
    debounceFunc500(fetchData);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      router.push(`/products?q=${keyword}`);
      event.preventDefault();
    }
  };

  const handleFocus = (e) => {
    setKeyword(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setKeyword('');
    }, 100);
  };

  return (
    <div className={clsx(styles.search_wrap, classCustom)} onBlur={handleBlur}>
      <form>
        <TextField
          {...restProps}
          classes={{
            root: styles.root_input,
          }}
          async
          onChange={handleSearchbox}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
              </InputAdornment>
            ),
            placeholder: 'Nhập tên thuốc, hoạt chất cần tìm...',
            autoComplete: 'off',
            classes: { focused: styles.focus },
          }}
          onFocus={handleFocus}
        />
      </form>
      {keyword && (
        <>
          <SearchDropdown keyword={keyword} data={searchProduct} />
        </>
      )}
    </div>
  );
});

export default SearchInput;
