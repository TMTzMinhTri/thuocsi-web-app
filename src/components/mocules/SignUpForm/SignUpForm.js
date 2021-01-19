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
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  RadioGroup,
} from '@material-ui/core';
import { Button, Input, CheckBox, Radio } from 'components/atoms';

import { FormDataUtils, ValidateUtils, NotifyUtils } from 'utils';

import { ENUM_SCOPE } from 'constants/Enums';

const { validateData, Error } = ValidateUtils;

const validateSignUp = ({ isCheckAgree, name, email, password, phone }) => {
  try {
    validateData.name(name);
    validateData.phoneNumber(phone);
    validateData.email(email);
    validateData.password(password);
    if (isCheckAgree !== '') throw new Error('Bạn chưa đồng ý chính sách thuốc sỉ.');
    return true;
  } catch (error) {
    NotifyUtils.error(error?.message || 'Đã có lỗi xảy ra');
  }
  return false;
};

const SignUpForm = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className, onClickSignIn, onClickSignUp, hasAlert } = props;

  const handleSubmitSignUp = useCallback(
    (e) => {
      const data = FormDataUtils.convert(e);
      e.preventDefault();
      // validate
      if (validateSignUp(data)) {
        onClickSignUp(data);
      }
    },
    [onClickSignUp],
  );

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
    <InputAdornment position="start">
      <PeopleIcon />
    </InputAdornment>
  );
  const IconEmail = (
    <InputAdornment position="start">
      <EmailIcon />
    </InputAdornment>
  );

  const errorElement = () => {
    if (hasAlert) {
      return <div>{hasAlert}</div>;
    }
    return null;
  };

  return (
    <div className={className}>
      <form className={className} onSubmit={handleSubmitSignUp}>
        {errorElement}
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
            placeholder="Nhập mật khẩu (bắt buộc)"
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
          <CheckBox name="isCheckAgree" label="Tôi đã đọc và đồng ý với điều khoản sử dụng *" />
        </div>
        <div className="agree-term">
          <RadioGroup defaultValue={ENUM_SCOPE.PHARMACY} aria-label="scope" name="scope" row>
            <FormControlLabel value={ENUM_SCOPE.PHARMACY} control={<Radio />} label="Nhà thuốc" />
            <FormControlLabel value={ENUM_SCOPE.CLINIC} control={<Radio />} label="Phòng khám" />
            <FormControlLabel value={ENUM_SCOPE.DRUGSTORE} control={<Radio />} label="Quầy thuốc" />
          </RadioGroup>
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
