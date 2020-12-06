import { AuthModal, SignInForm } from 'components/mocules';
import React from 'react';

const SignInModal = React.memo((props) => {
  const { className, visible, onCancel } = props;
  return (
    <AuthModal
      visible={visible}
      className={className}
      onCancel={onCancel}
      title="Đăng nhập"
    >
      <SignInForm />
    </AuthModal>
  );
});

export default SignInModal;
