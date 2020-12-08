import React, { useState } from 'react';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, IconButton, InputAdornment } from '@material-ui/core';
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
      <form className={className}>
        <FormControl className="form-control">
          <Input
            id="username"
            startAdornment={IconAccount}
            placeholder="Nhập số điện thoại hoặc email"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            startAdornment={IconPassword}
            endAdornment={IconEndPassword}
            placeholder="Nhập Mật khẩu"
            variant="outlined"
          />
        </FormControl>
        <div className="rememberPassword">
          <CheckBox isChecked label="Nhớ mật khẩu" />
        </div>
        <div className="forgetPassword">
          <a href="/" className="forgetPassword">
            Quên mật khẩu
          </a>
        </div>
        <Button className="btnLogin">Đăng nhập</Button>
        <div className="register">
          <span className="text-capitalize">
            Để nhận Ưu đãi hấp dẫn,
            <a href="/" style={{ color: '#f9b514', padding: '2px' }}>
              đăng ký thành viên
            </a>
          </span>
        </div>
      </form>
    </div>
  );
});

export default SignInForm;
