import React from 'react';
import { Box } from '@material-ui/core';
import ProductCardHorizontal from '../ProductCardHorizontal';
import { SearchOrder } from '../../mocules';

import styles from './style.module.css';

const QuickOrderList = ({ products }) => (
  <>
    <Box className={styles.search_input}>
      <SearchOrder />
    </Box>
    {products.map((item) => (
      <ProductCardHorizontal key={item.id} product={item} />
    ))}
  </>
);

export default QuickOrderList;
