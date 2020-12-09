import React, { useCallback } from 'react';

import { SignInModal, ForgetPasswordModal } from 'components';
import { Button } from '@material-ui/core';
import useModal from 'hooks/useModal';

export default function ModalTest() {
  const [isShowModal, toggle] = useModal();
  const [isShowModalForgetPassword, toggleForgetPassword] = useModal();
  const handleChangeForget = useCallback(() => {
    toggle();
    toggleForgetPassword();
  }, [toggle, toggleForgetPassword]);

  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={toggle} onClose={toggle}>
          Show modal Login
        </Button>
      </div>
      <SignInModal
        className="hello"
        visible={isShowModal}
        onClose={toggle}
        onChangeForget={handleChangeForget}
      >
        <div>
          <title>title</title>
          <body>heelloo</body>
        </div>
      </SignInModal>
      <div>
        <Button variant="contained" color="primary" onClick={toggleForgetPassword}>
          Show modal ForgetPassword
        </Button>
      </div>
      <ForgetPasswordModal visible={isShowModalForgetPassword} onClose={toggleForgetPassword} />
    </>
  );
}
