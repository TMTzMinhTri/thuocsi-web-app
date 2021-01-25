import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuth } from 'context';
import { QUICK_ORDER, CART_URL } from 'constants/Paths';
import { ButtonHeader } from 'components/atoms';
import FooterWithToolBar from './components/FooterWithToolBar';
import FooterWithCart from './components/FooterWithCart';

import styles from './styles.module.css';

const FooterComp = () => {
  const { isAuthenticated, toggleLogin, toggleSignUp } = useAuth();
  const router = useRouter();

  return (
    <footer className={styles.bottom_bar}>
      <div className={styles.global_style}>
        <Container maxWidth="lg">
          {!isAuthenticated ? (
            <div className={styles.div_buttons}>
              <ButtonHeader variant="contained" btnType="warning" onClick={toggleLogin}>
                Đăng nhập
              </ButtonHeader>
              <ButtonHeader
                className={styles.custombtn}
                variant="contained"
                btnType="primary"
                onClick={toggleSignUp}
              >
                Đăng ký
              </ButtonHeader>
            </div>
          ) : (
            <AppBar position="fixed" className={styles.appBar}>
              {router.pathname === QUICK_ORDER || router.pathname === CART_URL ? (
                <FooterWithCart />
              ) : (
                <FooterWithToolBar />
              )}
            </AppBar>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(FooterComp);
