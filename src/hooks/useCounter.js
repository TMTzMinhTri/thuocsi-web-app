import { useState } from 'react';

const useCounter = (initialCount = 1) => {
  const [count, setCount] = useState(initialCount);
  const incCount = () => setCount(count + 1);
  const decCount = () => setCount(count - 1);
 
  return { count, incCount, decCount, setCount };
};

export default useCounter;
