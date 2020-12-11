import React, { useState } from 'react';
import { AuthClient, isValid } from 'clients';
import { AuthModal, SignUpForm } from '../../mocules';

const SignUpModal = React.memo((props) => {
  const { className, visible, onClose, onChangeSignIn } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [hasAlert, setHasAlert] = useState('');

  const handleSignUp = (data) => {
    setIsLoading(true);
    AuthClient.signUp(data)
      .then((result) => {
        if (!isValid(result)) {
          setHasAlert('');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setHasAlert('Đã có lỗi xảy ra');
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <AuthModal
      visible={visible}
      className={className}
      onClose={onClose}
      title="Đăng ký Thành viên"
      width="438"
    >
      <SignUpForm
        width="350"
        hasAlert={hasAlert}
        onClickSignIn={onChangeSignIn}
        isLoading={isLoading}
        onClickSignUp={handleSignUp}
      />
    </AuthModal>
  );
});

export default SignUpModal;
