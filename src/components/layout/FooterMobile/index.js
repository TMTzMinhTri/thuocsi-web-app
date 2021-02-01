import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuth } from 'context';
import { QUICK_ORDER, CART_URL, PRODUCT } from 'constants/Paths';
import { ButtonHeader } from 'components/atoms';
import FooterWithToolBar from './components/FooterWithToolBar';
import FooterWithCart from './components/FooterWithCart';
import FooterWithAddToCart from './components/FooterWithAddToCart';
import styles from './styles.module.css';

const FooterComp = ({ product }) => {
  const { isAuthenticated, toggleLogin, toggleSignUp } = useAuth();
  const router = useRouter();
  return (
    <footer className={styles.bottom_bar}>
      <div className={styles.global_style}>
        <Container maxWidth="lg">
          {!isAuthenticated ? (
            <div className={styles.div_buttons}>
              <ButtonHeader
                variant="contained"
                color="#000"
                btnType="warning"
                onClick={toggleLogin}
              >
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
              {(router.pathname === QUICK_ORDER || router.pathname === CART_URL) && (
                <FooterWithCart />
              )}
              {router.pathname === PRODUCT && <FooterWithAddToCart product={product} />}
              {router.pathname !== QUICK_ORDER &&
                router.pathname !== CART_URL &&
                router.pathname !== PRODUCT && <FooterWithToolBar />}
            </AppBar>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(FooterComp);
