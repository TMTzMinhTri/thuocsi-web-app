import React, { memo } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from './styles.module.css';

const SearchInput = memo(() => (
  <Input
    classes={{
      root: styles.root_input,
      input: styles.input,
      focused: styles.focus,
    }}
    disableUnderline
    placeholder="Nhập tên thuốc, hoạt chất cần tìm..."
    startAdornment={(
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    )}
  />
));

export default SearchInput;
