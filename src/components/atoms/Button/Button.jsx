import { Button } from '@material-ui/core';
import React, { memo } from 'react';

const CustomButton = memo((props) => {
  const { type = 'primary', children, suffix, ...rest } = props;
  return (
    <Button type={type} {...rest}>
      {children}
      {suffix}
    </Button>
  );
});

export default CustomButton;
