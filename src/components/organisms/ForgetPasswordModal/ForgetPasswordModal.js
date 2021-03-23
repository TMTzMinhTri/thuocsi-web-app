import React, { useState } from 'react';
import { isValidWithoutData } from 'clients';
import { AuthService } from 'services';
import { NotifyUtils } from 'utils';
import { i18n } from 'i18n-lib';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { AuthModal, ForgetPasswordForm } from '../../mocules';
import styles from './styles.module.css';

const ForgetPasswordModal = React.memo((props) => {
  const { className, visible, onClose } = props;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [toggleResend, setToggleResend] = useState(false);
  const { t } = i18n.useTranslation(['apiErrors']);

  const onClickPhoneForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.success("Yêu cầu thay đổi mật khẩu thành công. Kiểm tra tin nhắn để lấy mã OTP");
      setIsLoading(false);
      setToggleResend(!toggleResend);
    } else {
      const errorCode = `login.${result.errorCode}`;
      NotifyUtils.error(t(errorCode));
      setIsLoading(false);
    }
  };

  const onSubmitOptForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordRecovery(data);
    if (isValidWithoutData(result)) {
      setStep(2);
      NotifyUtils.info(result.message);
      setIsLoading(false);
    } else {
      const errorCode = `login.${result.errorCode}`;
      NotifyUtils.error(t(errorCode));
      setIsLoading(false);
    }
  };

  const onSubmitNewPasswordForm = async (data) => {
    setIsLoading(true);
    const result = await AuthService.passwordUpdate(data);
    if (isValidWithoutData(result)) {
      setStep(3);
      setIsLoading(false);
      NotifyUtils.success("Mật khẩu mới đã được cập nhật");
    }
    else {
      let errorCode = `login.${result.errorCode}`;
      if (result.errorCode === 'NOT_FOUND'){
        errorCode = 'Nhập sai mã OTP. Vui lòng kiểm tra lại'
      }
      NotifyUtils.error(t(errorCode));
      setIsLoading(false);
    }
  };

  const clearState = () => {
    setStep(1);
    setIsTimeOut(false);
    setIsLoading(false);
  }

  const handleClose = () => {
    clearState();
    onClose();
  };

  const timeOut = () => {
    setIsTimeOut(true);
  }
  return (
    <AuthModal
      visible={visible}
      className={className}
      title="Khôi phục mật khẩu"
      onClose={handleClose}
    >
      {isLoading && (
        <div className={styles.overlay}>
          <LoadingScreen />
        </div>
      )}
      <ForgetPasswordForm
        className={className}
        onClickPhoneForm={onClickPhoneForm}
        onClickOptForm={onSubmitOptForm}
        onClickNewPasswordForm={onSubmitNewPasswordForm}
        onClose={handleClose}
        step={step}
        onTimeout={timeOut}
        isTimeOut={isTimeOut}
        setIsTimeOut={setIsTimeOut}
        toggleResend={toggleResend}
      />
    </AuthModal>
  );
});

export default ForgetPasswordModal;
