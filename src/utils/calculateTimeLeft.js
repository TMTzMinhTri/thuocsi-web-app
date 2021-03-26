export default function calculateTimeLeft(time){
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
