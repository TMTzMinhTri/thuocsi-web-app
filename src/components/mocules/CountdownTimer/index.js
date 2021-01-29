import React, { useEffect, useState } from 'react';
import { NoSsr } from '@material-ui/core';

// thuannc
// TODO:
// MUST FIX

function CountdownTimer({ prefix, dealEndDay, ...otherProps }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(dealEndDay) - +new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

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
  return (
    <NoSsr>
      <div {...otherProps}>{timerComponents.length ? timerComponents : <span>Hết hạn</span>}</div>
    </NoSsr>
  );
}

export default CountdownTimer;
