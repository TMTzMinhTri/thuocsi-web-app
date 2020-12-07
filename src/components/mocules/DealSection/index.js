import React from 'react';
import { LinearProgress, Box, Typography } from '@material-ui/core';
import CountdownTimer from '../../atoms/CountdownTimer';

import styles from './styles.module.css';

const DealSection = ({ dealEndDay }) => (
  <Box className={styles.deal_section}>
    <Box className={styles.process_wrapper}>
      <LinearProgress
        classes={{
          root: styles.root_process,
          bar: {
            borderRadius: 5,
            backgroundColor: 'red',
          },
          barColorPrimary: styles.bar_background,
          colorPrimary: styles.blur_background,
        }}
        variant="determinate"
        value={50}
      />
      <Typography className={styles.process_content}>Đã bán 0</Typography>
    </Box>

    <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
  </Box>
);

export default DealSection;
