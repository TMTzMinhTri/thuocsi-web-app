import React, { useCallback, useState } from 'react';
import {
  AccountCircle as AccountIcon,
  Visibility,
  VisibilityOff,
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  PeopleOutlined as PeopleIcon,
} from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, IconButton, InputAdornment } from '@material-ui/core';
import { Button, Input, CheckBox } from 'components/atoms';

import { FormDataUtils } from 'utils';

const SignUpForm = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className, onClickSignIn, isCheckAgree, onClickSignUp } = props;

  const handleSubmitSignUp = (e) => {
    const data = FormDataUtils.convert(e);
    e.preventDefault();
    onClickSignUp(data);
  };

  const handleClickSignIn = useCallback(
    (e) => {
      e.preventDefault();
      onClickSignIn();
    },
    [onClickSignIn],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const IconAccount = (
    <InputAdornment position="start">
      <AccountIcon />
    </InputAdornment>
  );
  const IconPassword = (
    <InputAdornment position="start">
      <LockOutlinedIcon />
    </InputAdornment>
  );

  const IconPhone = (
    <InputAdornment position="start">
      <PhoneIcon />
    </InputAdornment>
  );

  const IconEndPassword = (
    <InputAdornment>
      <IconButton onClick={handleClickShowPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
  const IconInviter = (
    <InputAdornment>
      <PeopleIcon />
    </InputAdornment>
  );
  const IconEmail = (
    <InputAdornment position="start">
      <EmailIcon />
    </InputAdornment>
  );

  return (
    <div className={className}>
      <form className={className} onSubmit={handleSubmitSignUp}>
        <FormControl className="form-control">
          <Input
            id="username"
            name="name"
            startAdornment={IconAccount}
            placeholder="Nhập tên (bắt buộc)"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="phonenumber"
            name="phone"
            startAdornment={IconPhone}
            placeholder="Nhập số điện thoại (bắt buộc)"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="email"
            name="email"
            startAdornment={IconEmail}
            placeholder="Nhập email"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            startAdornment={IconPassword}
            endAdornment={IconEndPassword}
            placeholder="Nhập Mật khẩu (bắt buộc)"
            variant="outlined"
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="inviter"
            name="referCode"
            startAdornment={IconInviter}
            placeholder="Nhập số điện thoại người giới thiệu hoặc mã nhóm."
            variant="outlined"
          />
        </FormControl>
        <div className="agree-term">
          <CheckBox checked={isCheckAgree} label="Tôi đã đọc và đồng ý với điều khoản sử dụng *" />
        </div>
        <div className="link-login">
          <span className="text-capitalize">
            Nếu bạn đã có tài khoản, vui lòng
            <a href="#top" style={{ color: '#f9b514', padding: '2px' }} onClick={handleClickSignIn}>
              Đăng nhập
            </a>
          </span>
        </div>
        <Button className="btn-register" color="white" type="submit">
          Tạo tài khoản
        </Button>
      </form>
    </div>
  );
});

export default SignUpForm;
