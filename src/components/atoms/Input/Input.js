import React, { memo } from 'react';
import { OutlinedInput } from '@material-ui/core';

const InputComp = memo((props) => {
  const { className, children, ...rest } = props;
  return (
    <OutlinedInput className={className} {...rest}>
      {children}
    </OutlinedInput>
  );
});

export default InputComp;
