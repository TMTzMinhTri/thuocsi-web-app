import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import { useModal } from 'hooks';
import { SignUpModal, SignInModal, ForgetPasswordModal } from 'components/organisms';
import { useAuth } from 'context';
import { Button } from '../../atoms';
import styles from './styles.module.css';

const FooterComp = () => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { isAuthenticated } = useAuth();
  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);
  return (
    <footer className={styles.bottom_bar}>
      <div className={styles.global_style}>
        <Container maxWidth="lg">
          {!isAuthenticated
          && (
          <>
            <SignInModal
              visible={isShowingLogin}
              onClose={toggleLogin}
              onChangeForget={handleChangeForget}
            />
            <ForgetPasswordModal visible={isShowingForgetPassword} onClose={toggleForgetPassword} />
            <SignUpModal
              visible={isShowingSignUp}
              onClose={toggleSignUp}
              onChangeSignIn={handleChangeSignIn}
            />

            <div className={styles.div_buttons}>
              <Button variant="contained" btnType="warning" onClick={toggleLogin}>
                Đăng nhập
              </Button>
            </div>
          </>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(FooterComp);
