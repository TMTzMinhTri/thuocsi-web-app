import React from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.css';

const RibbonPriceDown = () => (
  <Box className={clsx(styles.ribbon, styles.price_down)}>
    <span className={clsx(styles.ribbon_percent, styles.price_down)}>63%</span>
    <span className={styles.ribbon_status}>Tăng</span>
  </Box>
);

export default RibbonPriceDown;
