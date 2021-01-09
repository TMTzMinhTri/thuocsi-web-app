import React, { useCallback } from 'react';
import { Container, AppBar } from '@material-ui/core';
import { SignUpModal } from 'components/organisms';
import { useRouter } from 'next/router';
import { useModal } from 'hooks';
import { useAuth } from 'context';
import { Button } from '../../atoms';
import FooterWithToolBar from './components/FooterWithToolBar';
import FooterWithCart from './components/FooterWithCart';
import styles from './styles.module.css';

const FooterComp = () => {
  const { isAuthenticated } = useAuth();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const router = useRouter();

  const toggleLoginMobile = () => {
    const link = document.getElementById('loginMobile');
    link.click();
  };

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
  }, [toggleSignUp]);

  return (
    <footer className={styles.bottom_bar}>
      <div className={styles.global_style}>
        <Container maxWidth="lg">
          {!isAuthenticated ? (
            <div className={styles.div_buttons}>
              <Button variant="contained" btnType="warning" onClick={toggleLoginMobile}>
                Đăng nhập
              </Button>
              <Button
                className={styles.custombtn}
                variant="contained"
                btnType="primary"
                onClick={toggleSignUp}
              >
                Đăng ký
              </Button>
              <SignUpModal
                visible={isShowingSignUp}
                onClose={toggleSignUp}
                onChangeSignIn={handleChangeSignIn}
              />
            </div>
          ) : (
            <AppBar position="fixed" className={styles.appBar}>
              {router.pathname === '/quick-order'
                ? <FooterWithCart />
                : <FooterWithToolBar />}
            </AppBar>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(FooterComp);
