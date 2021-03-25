import React, { useState, useEffect } from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import formatDate from 'utils/FormatDate';
import CountdownTimer from '../CountdownTimer';

import styles from './styles.module.css';

const DealSection = ({ dealEndDay, dealStartTime, maxQuantity, totalSold = 0, total = 0 }) => {
  const calculateTimeLeft = (time) => {
    const difference = +new Date(time) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, '0');
      const minutes = `:${Math.floor((difference / 1000 / 60) % 60)
        .toString()
        .padStart(2, '0')}:`;
      const seconds = Math.floor((difference / 1000) % 60)
        .toString()
        .padStart(2, '0');
      timeLeft = {
        days,
        hours,
        minutes,
        seconds,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dealStartTime));
  const ready = Object.keys(timeLeft).length === 0 || false;
  const date = formatDate(dealStartTime);

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={`timer-${Math.random()}`}>
        {timeLeft[interval]}
        {interval === 'days' ? ' ngày ' : null}
      </span>,
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dealStartTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.deal_section}>
      <div className={styles.process_wrapper}>
        <LinearProgress
          classes={{
            root: styles.root_process,
            barColorPrimary: styles.bar_background,
            colorPrimary: styles.blur_background,
          }}
          variant="determinate"
          value={(totalSold / total) * 100}
        />
        <Typography className={styles.process_content}>
          {ready && (maxQuantity === totalSold) ? 'Cháy hàng' : `Đã bán${totalSold}`}
          {!ready && 'Sắp mở bán'}
        </Typography>
      </div>
      {ready ? (
        <CountdownTimer className={styles.count_down} dealEndDay={dealEndDay} />
      ) : (
        <div className={styles.startDate}>{date}</div>
      )}
    </div>
  );
};

export default DealSection;
