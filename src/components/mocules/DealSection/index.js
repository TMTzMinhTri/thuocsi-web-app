import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import CountdownTimer from '../CountdownTimer';

import styles from './styles.module.css';

const DealSection = ({ dealEndDay, totalSold = 0, total = 0 }) => (
  <div className={styles.deal_section}>
    <div className={styles.process_wrapper}>
      <LinearProgress
        classes={{
          root: styles.root_process,
          barColorPrimary: styles.bar_background,
          colorPrimary: styles.blur_background,
        }}
        variant="determinate"
        value={totalSold / total}
      />
      <Typography className={styles.process_content}>Đã bán {totalSold}</Typography>
    </div>
    <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
  </div>
);

export default DealSection;
