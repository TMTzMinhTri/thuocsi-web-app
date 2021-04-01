import React, { useState } from 'react';
import { FormControl } from '@material-ui/core';
import { Button, Input } from 'components/atoms';
import { FormDataUtils } from 'utils';
import styles from './styles.module.css';

const SignInForm = React.memo(({ className, onClickRegister }) => {
  const regExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');

  const validatePhone = (data) => {
    setErrorPhone(false);
    if (data === '') {
      setErrorPhone(true);
      setErrorPhoneMessage('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!data.match(regExp)) {
      setErrorPhone(true);
      setErrorPhoneMessage('Số điện thoại bạn nhập không đúng');
      return false;
    }
    return true;
  };

  // handle login with data
  const handleRegisterGuest = (e) => {
    const data = FormDataUtils.convert(e);
    e.preventDefault();
    if (!validatePhone(data.phone)) {
      return;
    }
    onClickRegister(data);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    validatePhone(e.target.value);
  };

  return (
    <div className={styles.form}>
      <form className={className} onSubmit={handleRegisterGuest}>
        <h1 className={styles.title}>Vui lòng nhập số điện thoại trước khi dùng thử</h1>
        <FormControl className={styles.formInput}>
          <Input
            id="phone"
            name="phone"
            type="number"
            placeholder="Nhập số điện thoại"
            variant="outlined"
            error={errorPhone}
            onChange={handleOnChange}
          />
          <div className={styles.error}>{errorPhone && errorPhoneMessage}</div>
        </FormControl>
        <div className={styles.bottom_text}>Mã khuyến mãi 100k dành cho nhà thuốc mới đăng ký</div>
        <div className={styles.btnWrapper}>
          <Button className="btnLogin" color="white" type="submit">
            Đăng Ký
          </Button>
        </div>
      </form>
    </div>
  );
});

export default SignInForm;
