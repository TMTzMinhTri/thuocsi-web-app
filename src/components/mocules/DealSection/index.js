import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import { formatDate } from 'utils';
import CountdownTimer from '../CountdownTimer';

import styles from './styles.module.css';

const DealSection = ({ dealEndDay, dealReady, dealStartTime, maxQuantity, totalSold = 0, total = 0 }) => {
  const date = formatDate(dealStartTime);

  return (
    <div className={styles.deal_section}>
      <div className={styles.process_wrapper}>
        <LinearProgress
          classes={{
            root: styles.root_process,
            barColorPrimary: styles.blur_background,
            colorPrimary: styles.bar_background,
          }}
          variant="determinate"
          value={(totalSold / total) * 100}
        />
        <Typography className={styles.process_content}>
          {dealReady && maxQuantity === totalSold && 'Hết hàng'}
          {dealReady && maxQuantity > totalSold && `Đã bán ${totalSold}`}
          {!dealReady && 'Sắp mở bán'}
        </Typography>
      </div>
      {dealReady ? (
        <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
      ) : (
        <div className={styles.startDate}>{date}</div>
      )}
    </div>
  );
};

export default DealSection;
