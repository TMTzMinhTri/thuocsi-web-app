import React from 'react';

import { SignInModal } from 'components';
import { Button } from '@material-ui/core';
import useModal from 'hooks/useModal';

export default function ModalTest() {
  const [isShowModal, toggle] = useModal();
  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={toggle}>Show modal Login</Button>
      </div>
      <SignInModal className="hello" visible={isShowModal}>
        <div>
          <title>title</title>
          <body>heelloo</body>
        </div>
      </SignInModal>
    </>
  );
}
