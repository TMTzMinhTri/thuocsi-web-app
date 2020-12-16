import React, { memo } from 'react';
import { Button } from '@material-ui/core';

const CustomButton = memo((props) => {
  const { children, className, suffix, color, ...rest } = props;
  return (
    <Button className={className} {...rest}>
      {children}
      {suffix}
    </Button>
  );
});

export default CustomButton;
