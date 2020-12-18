import React, { useState } from 'react';
import { useAuth } from 'context';
import { AuthClient, isValid } from 'clients';
import { useRouter } from 'next/router';
import { AuthModal, SignInForm } from '../../mocules';

const SignInModal = React.memo((props) => {
  const { className, visible, onClose, onChangeForget } = props;
  const [hasAlert, setHasAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (data) => {
    setIsLoading(true);
    AuthClient.login(data)
      .then((result) => {
        if (!isValid(result)) {
          setHasAlert('Đã có nhiều lỗi xảy ra');
          return;
        }
        const userInfo = result.data[0];
        login(userInfo);

        // redirect to quick-order - when login success
        router.push('/quick-order');
      })
      .catch((error) => {
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
        isLoading={isLoading}
        onClickLogin={handleLogin}
      />
    </AuthModal>
  );
});

export default SignInModal;
