import React from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { RIBBON_STATUS } from 'constants/Enums';
import styles from './styles.module.css';

const Ribbon = ({ status = RIBBON_STATUS.UP, percent = '63' }) => (
  <Box className={clsx(styles.ribbon, styles[`price_${status}`])}>
    <span className={clsx(styles.ribbon_percent, styles[`price_${status}`])}>{percent}%</span>
    <span className={styles.ribbon_status}>{status === RIBBON_STATUS.UP ? 'Tăng' : 'Giảm'}</span>
  </Box>
);

export default Ribbon;
