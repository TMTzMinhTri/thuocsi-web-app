import React, { useEffect, useState } from 'react';

function CountdownTimer({ dealEndDay, ...otherProps }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(dealEndDay) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, '0'),
        minutes: `:${Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, '0')}:`,
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
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
    <div {...otherProps}>{timerComponents.length ? timerComponents : <span>Hết hạn</span>}</div>
  );
}

export default CountdownTimer;
