import React, { useEffect, useState } from 'react';
import { calculateTimeLeft } from 'utils';
import { NoSsr } from '@material-ui/core';

// thuannc
// TODO:
// MUST FIX

function CountdownTimer({ prefix, dealEndDay, ...otherProps }) {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(dealEndDay));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(dealEndDay));
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
      <div {...otherProps}>
        {prefix} {timerComponents.length ? timerComponents : <span>Hết hạn</span>}
      </div>
    </NoSsr>
  );
}

export default CountdownTimer;
