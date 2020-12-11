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
          setHasAlert(`Đã có lỗi xảy ra ${result.message}`);
        }
        // notification
      })
      .catch((error) => {
        setHasAlert(`Đã có lỗi xảy ra ${error.message}`);
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
