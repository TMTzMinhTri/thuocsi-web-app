import React, { useState } from 'react';
import { useAuth, useCart } from 'context';
import { AuthClient, isValid } from 'clients';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';
import { i18n } from 'i18n-lib';
import { AuthModal, SignInForm } from 'components/mocules';
import { QUICK_ORDER } from 'constants/Paths';

const SignInModal = ({ className, visible, onClose, onChangeForget, onChangeSignUp, t }) => {
  const [hasAlert, setHasAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { updateCart } = useCart();
  const router = useRouter();

  const handleLogin = (data) => {
    const { rememberMe } = data;
    setIsLoading(true);

    AuthClient.login(data)
      .then((result) => {
        if (!isValid(result)) {
          const errorCode = `login.${result.errorCode}`;
          NotifyUtils.error(t(errorCode));
          return;
        }

        NotifyUtils.success(t('login.success'));
        const userInfo = result?.data[0];
        login(userInfo, rememberMe === '');
        updateCart();
        // redirect to quick-order - when login success
        if (router.pathname === '/') {
          router.push(QUICK_ORDER);
        }
      })

      .catch((error) => {
        NotifyUtils.error(t('error'));
        setHasAlert(`Đã có lỗi xảy ra ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <AuthModal
      visible={visible}
      className={className}
      onClose={onClose}
      title="Đăng nhập Thành viên"
      width="438"
    >
      <SignInForm
        width="350"
        hasAlert={hasAlert}
        onClickForget={onChangeForget}
        onClickSignUp={onChangeSignUp}
        isLoading={isLoading}
        onClickLogin={handleLogin}
      />
    </AuthModal>
  );
};

export default i18n.withTranslation('apiErrors')(React.memo(SignInModal));
