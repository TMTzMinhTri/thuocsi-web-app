import React from 'react';
import { AuthModal, ForgetPasswordForm } from '../../mocules';

const ForgetPasswordModal = React.memo((props) => {
  const { className, visible, onClose } = props;
  return (
    <AuthModal visible={visible} className={className} title="Khôi phục mật khẩu" onClose={onClose}>
      <ForgetPasswordForm />
    </AuthModal>
  );
});

export default ForgetPasswordModal;
