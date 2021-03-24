import React, { useState } from 'react';
import { Button } from 'components/atoms';
import DiscoveryModal from '../DiscoveryModal';

const DiscoveryButton = () => {
  const [val, setVal] = useState(false);
  const handleChangeVal = () => {
    setVal(!val);
  };
  return (
    <>
      <Button className="my-order__button my-order__button--green" onClick={handleChangeVal}>
        Khám phá
      </Button>
      <DiscoveryModal visible={val} onClose={handleChangeVal} />
    </>
  );
};

export default React.memo(DiscoveryButton);
