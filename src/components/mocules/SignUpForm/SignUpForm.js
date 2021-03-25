import React, { useCallback, useState, useEffect } from 'react';
import {
  AccountCircle as AccountIcon,
  Visibility,
  VisibilityOff,
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  PeopleOutlined as PeopleIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationOnIcon,
} from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  RadioGroup,
  NativeSelect,
} from '@material-ui/core';
import { Button, Input, CheckBox, Radio } from 'components/atoms';

import { FormDataUtils, ValidateUtils, NotifyUtils } from 'utils';
import { ENUM_SCOPE } from 'constants/Enums';
import { AddressService } from 'services';
import styles from './styles.module.css';

const { validateData, Error, isEmpty } = ValidateUtils;

const validateSignUp = ({ isCheckAgree, name, email, password, phone }, failCallback) => {
  try {
    validateData.name(name);
    validateData.phoneNumber(phone);
    if (!isEmpty(email)) {
      validateData.email(email);
    }

    validateData.password(password);
    if (isCheckAgree !== '') throw new Error('Vui lòng chọn Đồng ý với Điều khoản sử dụng.');
    return true;
  } catch (error) {
    NotifyUtils.error(error?.message || 'Đã có lỗi xảy ra');
    failCallback(error);
    return false;
  }
};

const SignUpForm = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { className, onClickSignIn, onClickSignUp, refer } = props;
  const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const getListProvince = async () => {
      try {
        const provinceResult = await AddressService.getProvinces();
        setProvinces(provinceResult);
      } catch (error) {
        NotifyUtils.error('Lấy danh sách tỉnh thành không thành công');
      }
    };
    getListProvince();
  }, []);
  const handleSubmitSignUp = useCallback(
    (e) => {
      const data = FormDataUtils.convert(e);
      e.preventDefault();
      // validate
      if (
        validateSignUp(data, (error) => {
          if (error) {
            const newError = {};
            newError[error.type] = true;
            setErrors({ ...newError });
          }
        })
      ) {
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

  const IconLocation = (
    <InputAdornment position="start">
      <LocationOnIcon />
    </InputAdornment>
  );
  const IconEndPassword = (
    <InputAdornment>
      <IconButton onClick={handleClickShowPassword}>
        {!showPassword ? <Visibility /> : <VisibilityOff />}
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

  const labelAgree = (
    <div>
      Tôi đã đọc và đồng ý với
      <a href="/terms-and-condition" target="_blank" rel="noreferrer" style={{ color: 'green' }}>
        Điều khoản sử dụng *
      </a>
    </div>
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
            error={errors.name || false}
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="phonenumber"
            name="phone"
            startAdornment={IconPhone}
            placeholder="Nhập số điện thoại (bắt buộc)"
            variant="outlined"
            error={errors.phone || false}
          />
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="email"
            name="email"
            startAdornment={IconEmail}
            placeholder="Nhập email"
            variant="outlined"
            error={errors.email || false}
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
            error={errors.password || false}
          />
        </FormControl>
        <FormControl className="form-control">
          <NativeSelect
            id="provinceCode"
            name="provinceCode"
            IconComponent={ExpandMoreIcon}
            input={<Input startAdornment={IconLocation} />}
            className={styles.province}
          >
            {provinces.map((province) => (
              <option value={province.value}> {province.label}</option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl className="form-control">
          <Input
            id="inviter"
            name="refer"
            startAdornment={IconInviter}
            value={refer}
            placeholder="Nhập số điện thoại người giới thiệu hoặc mã nhóm."
            variant="outlined"
            disabled={!!refer}
          />
        </FormControl>
        <div className="agree-term">
          <CheckBox name="isCheckAgree" label={labelAgree} />
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
              <b> Đăng nhập</b>
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
