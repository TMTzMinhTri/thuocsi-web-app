import React from 'react';
import { AuthModal, SignInForm } from '../../mocules';

const SignInModal = React.memo((props) => {
  const { className, visible, onClose, onChangeForget } = props;
  return (
    <AuthModal
      visible={visible}
      className={className}
      onClose={onClose}
      title="Đăng nhập Thành viên"
      width="438"
    >
      <SignInForm width="350" onClickForget={onChangeForget} />
    </AuthModal>
  );
});

export default SignInModal;
