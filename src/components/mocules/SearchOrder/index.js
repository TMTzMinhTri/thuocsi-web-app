import React, { memo } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { WEB_STYLES } from 'styles';
import styles from './styles.module.css';

const SearchOrder = memo(({ onSearch, isMobile, ...restProps }) => {
  const iconStart = (
    <InputAdornment position="start">
      <Search style={{ color: WEB_STYLES.COLORS.GREEN }} />
    </InputAdornment>
  );

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch(event);
      event.preventDefault();
    }
  };
  return (
    <Input
      {...restProps}
      classes={{
        root: styles.root_input,
        input: styles.input,
        focused: styles.focus,
      }}
      disableUnderline
      placeholder="Nhập tên thuốc, hoạt chất cần tìm..."
      onKeyDown={handleKeyDown}
      startAdornment={!isMobile && iconStart}
      onChange={onSearch}
    />
  );
});

export default SearchOrder;
