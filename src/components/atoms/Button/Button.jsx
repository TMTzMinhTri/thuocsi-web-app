import React, { memo } from 'react';
import { Button } from '@material-ui/core';

const CustomButton = memo((props) => {
  const { type = 'primary', children, className, suffix, ...rest } = props;
  return (
    <Button type={type} className={className} {...rest}>
      {children}
      {suffix}
    </Button>
  );
});

export default CustomButton;
