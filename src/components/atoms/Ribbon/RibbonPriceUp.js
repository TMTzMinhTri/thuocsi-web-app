import React from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.css';

const RibbonPriceUp = () => (
  <Box className={clsx(styles.ribbon, styles.price_up)}>
    <span className={clsx(styles.ribbon_percent, styles.price_up)}>63%</span>
    <span className={styles.ribbon_status}>Tăng</span>
  </Box>
);

export default RibbonPriceUp;
