import { FormControl, InputAdornment } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { Button, Input } from '../../atoms';

const ForgetPasswordForm = React.memo((props) => {
  const { className } = props;
  const IconAccount = (
    <InputAdornment position="start">
      <AccountCircle />
    </InputAdornment>
  );

  return (
    <div className={className}>
      <form className={`form-forget-password ${className}`}>
        <FormControl className="form-control">
          <Input
            id="username"
            startAdornment={IconAccount}
            placeholder="Nhập số điện thoại hoặc email"
            variant="outlined"
          />
        </FormControl>
        <Button className="btnForgetPassword" color="white">
          Gửi Link khôi phục
        </Button>
      </form>
    </div>
  );
});
export default ForgetPasswordForm;
