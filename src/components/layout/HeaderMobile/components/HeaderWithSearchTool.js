import React, { memo } from 'react';
import { IconButton, Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { SearchInput } from 'components/mocules';

import styles from '../styles.module.css';

const HeaderWithSearchTool = memo(() => (
  <div className={styles.searchTool}>
    <Box className={styles.search_input}>
      <SearchInput />
    </Box>
    <IconButton className={styles.icon} aria-label="search">
      <Search />
    </IconButton>
  </div>
));

export default HeaderWithSearchTool;
