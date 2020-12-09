import React from 'react';
import { AuthModal, SignUpForm } from '../../mocules';

const SignUpModal = React.memo((props) => {
  const { className, visible, onClose, onChangeSignIn } = props;
  return (
    <AuthModal
      visible={visible}
      className={className}
      onClose={onClose}
      title="Đăng ký Thành viên"
      width="438"
    >
      <SignUpForm width="350" onClickSignIn={onChangeSignIn} />
    </AuthModal>
  );
});

export default SignUpModal;
