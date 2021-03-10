import { FormControl, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAuth } from 'context';
import { FormDataUtils } from 'utils';
import { Button, Input, ButtonHeader } from 'components/atoms';

import styles from './styles.module.css';

const ForgetPasswordForm = React.memo(
  ({
    className,
    onClickPhoneForm,
    onClickNewPasswordForm,
    step,
    onTimeout,
    isTimeOut,
    setIsTimeOut,
    toggleResend
  }) => {
    const { toggleLogin } = useAuth();
    const regExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const regExpOpt = /^.{6,6}$/;
    const regExpPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^.{8,20}$)/;
    const SECOND_TIMEOUT = 180;

    const [phoneValue, setPhoneValue] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorPhoneMessage, setErrorPhoneMessage] = useState('');

    const [errorOtp, setErrorOtp] = useState(false);
    const [errorOtpMessage, setErrorOtpMessage] = useState('');

    const [pwValue, setPwValue] = useState('');
    const [errorPw, setErrorPw] = useState(false);
    const [errorPwMessage, setErrorPwMessage] = useState('');

    const [errorPwConfirm, setErrorPwConfirm] = useState(false);
    const [errorPwConfirmMessage, setErrorPwConfirmMessage] = useState('');

    const [second, setSecond] = useState(-1);

    // handle validate
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

    const validateOtp = (data) => {
      setErrorOtp(false);
      if (data === '') {
        setErrorOtp(true);
        setErrorOtpMessage('Vui lòng nhập mã OTP');
        return false;
      }
      if (!data.match(regExpOpt)) {
        setErrorOtp(true);
        setErrorOtpMessage('Mã OTP gồm 6 chữ số');
        return false;
      }
      return true;
    };

    const validatePw = (data) => {
      setErrorPw(false);
      if (data === '') {
        setErrorPw(true);
        setErrorPwMessage('Bạn chưa điền mật khẩu');
        return false;
      }
      if (!data.match(regExpPw)) {
        setErrorPw(true);
        setErrorPwMessage(
          'Mật khẩu phải ít nhất 8 ký tự và không quá 20 ký tự. Có chứa ít nhất 1 chữ thường, 1 chữ hoa, và 1 số',
        );
        return false;
      }
      return true;
    };

    const validatePwConfirm = (data) => {
      setErrorPwConfirm(false);
      if (data === '') {
        setErrorPwConfirm(true);
        setErrorPwConfirmMessage('Bạn chưa điền mật khẩu xác nhận');
        return false;
      }
      if (data !== pwValue) {
        setErrorPwConfirm(true);
        setErrorPwConfirmMessage('Mật khẩu xác nhận không khớp');
        return false;
      }
      return true;
    };

    // handle submit form
    const onSubmitPhoneForm = (e) => {
      e.preventDefault();
      const data = FormDataUtils.convert(e);
      setPhoneValue(data.phoneNumber);
      if (!validatePhone(data.phoneNumber)) {
        return;
      }
      // data type is customer on web
      data.type = "CUSTOMER";
      onClickPhoneForm(data);
    };

    const onSubmitNewPasswordForm = (e) => {
      e.preventDefault();
      const data = FormDataUtils.convert(e);
      if (!validateOtp(data.token)) {
        return;
      }
      if (!validatePw(data.newPassword) || !validatePwConfirm(data.confirmPassword)) {
        return;
      }
      delete data.confirmPassword;
      // data type is customer on web
      data.type = "CUSTOMER";
      onClickNewPasswordForm(data);
    };

    // handle input
    const handleOnChangePhone = (e) => {
      e.preventDefault();
      validatePhone(e.target.value);
    };
    const handleOnChangeOpt = (e) => {
      e.preventDefault();
      validateOtp(e.target.value);
    };

    const handleOnChangePw = (e) => {
      e.preventDefault();
      setPwValue(e.target.value);
      validatePw(e.target.value);
    };

    const handleOnChangePwConfirm = (e) => {
      e.preventDefault();
      validatePwConfirm(e.target.value);
    };

    const startCoundown = (time) => {
      setSecond(time);
      setIsTimeOut(false);
    };

    const onResend = () => {
      startCoundown(SECOND_TIMEOUT);
      onClickPhoneForm({phoneNumber:phoneValue});
    }

    useEffect(() => {
      if (step === 2) {
        startCoundown(SECOND_TIMEOUT);
      }
    }, [toggleResend]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (second > 0 && second !== -1) {
          setSecond(second - 1);
          // setMinute(Math.floor(second / 60));
        }
        if (second === 0) {
          onTimeout();
        }
        
      }, 1000);
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    }, [second]);

    return (
      <div className={className}>
        {step === 1 && (
          <div className="forget-password">
            <div className="desc">Nhập số điện thoại cần khôi phục</div>
            <form className={`form-forget-password ${className}`} onSubmit={onSubmitPhoneForm}>
              <FormControl className="form-control">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  className={styles.input}
                  error={errorPhone}
                  onChange={handleOnChangePhone}
                />
                <div className={styles.error}>{errorPhone && errorPhoneMessage}</div>
              </FormControl>
              <div className="action">
                <Button type="submit" className="btnForgetPassword" color="white">
                  Gửi
                </Button>
              </div>
            </form>
          </div>
        )}
        {step === 2 && (
          <div className="forget-password">
            <div className="desc">Nhập mã OTP và mật khẩu mới</div>
            <form
              className={`form-forget-password ${className}`}
              onSubmit={onSubmitNewPasswordForm}
            >
              <FormControl className="form-control">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  className={[styles.input, styles.disabled]}
                  value={phoneValue}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
              <FormControl className="form-control">
                <div className={styles.custom_field}>
                  <Input
                    className={styles.input}
                    id="token"
                    name="token"
                    text="text"
                    placeholder="Nhập mã OTP"
                    variant="outlined"
                    error={errorOtp}
                    onChange={handleOnChangeOpt}
                  />
                  <div className={styles.right_c}>
                    {!isTimeOut ? (
                      <div className={styles.remaining}>{second}</div>
                    ) : (
                      <Button className="btnForgetPassword" color="white" onClick={onResend}>
                        Gửi lại
                      </Button>
                    )}
                  </div>
                </div>
                {errorOtp && <div className={styles.error}>{errorOtpMessage}</div>}
              </FormControl>
              <FormControl className="form-control">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  variant="outlined"
                  className={styles.input}
                  error={errorPw}
                  onChange={handleOnChangePw}
                />
                {errorPw && <div className={styles.error}>{errorPwMessage}</div>}
              </FormControl>
              <FormControl className="form-control">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Xác nhận lại mật khẩu"
                  variant="outlined"
                  error={errorPwConfirm}
                  className={styles.input}
                  onChange={handleOnChangePwConfirm}
                />
                <div className={styles.error}>{errorPwConfirm && errorPwConfirmMessage}</div>
              </FormControl>
              <div className="action">
                <Button type="submit" className="btnForgetPassword" color="white">
                  Gửi
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="forget-password">
            <div className={styles.confirm_modal_wrap}>
              <div style={{ textAlign: 'center' }}>
                <div className={styles.warning_icon}>
                  <Typography className={styles.text_icon}>✓</Typography>
                </div>
                <Typography className={styles.modal_title}>Thay đổi mật khẩu thành công</Typography>
              </div>
            </div>
            <div className={styles.btngroup}>
              <ButtonHeader variant="contained" btnType="primary" onClick={toggleLogin}>
                Đăng nhập
              </ButtonHeader>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="forget-password">
            <div className={styles.confirm_modal_wrap}>
              <div style={{ textAlign: 'center' }}>
                <div className={styles.warning_icon}>
                  <Typography className={styles.text_icon}>✓</Typography>
                </div>
                <Typography className={styles.modal_title}>Thay đổi mật khẩu thành công</Typography>
              </div>
            </div>
            <div className={styles.btngroup}>
              <ButtonHeader variant="contained" btnType="primary" onClick={toggleLogin}>
                Đăng nhập
              </ButtonHeader>
            </div>
          </div>
        )}
      </div>
    );
  },
);
export default ForgetPasswordForm;
