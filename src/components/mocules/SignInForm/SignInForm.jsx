import React, { useState } from 'react';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, IconButton, InputAdornment } from '@material-ui/core';
import Link from 'next/link';
import { Button, Input, CheckBox } from 'components/atoms';

const SignInForm = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const IconAccount = (
    <InputAdornment position="start">
      <AccountCircle />
    </InputAdornment>
  );
  const IconPassword = (
    <InputAdornment>
      <LockOutlinedIcon />
    </InputAdornment>
  );

  const IconEndPassword = (
    <InputAdornment>
      <IconButton onClick={handleClickShowPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className={className}>
      <FormControl>
        <Input
          id="username"
          startAdornment={IconAccount}
          placeholder="Nhập số điện thoại hoặc email"
          variant="outlined"
        />
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          startAdornment={IconPassword}
          endAdornment={IconEndPassword}
          placeholder="Nhập Mật khẩu"
          variant="outlined"
        />
        <CheckBox isChecked="true" label="Nhớ mật khẩu" />
        <Link href="/">Quên mật khẩu</Link>
        <Button>Đăng nhập</Button>
        <div>để nhận Ưu đãi hấp dẫn, đăng ký thành viên</div>
      </FormControl>
    </div>
  );
});

export default SignInForm;
