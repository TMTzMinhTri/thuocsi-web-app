import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from 'hooks';
import { Drawer, IconButton, Fab, Button } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { LOGO_THUOCSI } from 'constants/Images';
import { SignUpModal, SignInModal, ForgetPasswordModal, SideBar } from 'components/organisms';
import { useAuth, useCart } from 'context';

import clsx from 'clsx';
import HeaderWithSearchTool from './components/HeaderWithSearchTool';
import HeaderWithCart from './components/HeaderWithCart';

import styles from './styles.module.css';

const HeaderMobile = memo(({ title = '' }) => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { isAuthenticated } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const { itemCount } = useCart();

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };
  return (
    <div className={styles.login_wrapper}>
      <div
        className={clsx(
          styles.login,
          isAuthenticated && styles.logged,
          router.pathname === '/quick-order' ? styles.search_tool_wrapper : '',
          router.pathname === '/cart' ? styles.cart_wrapper : '',
        )}
      >
        {!isAuthenticated ? (
          <>
            <Link href="/">
              <Image
                className={styles.logo}
                href="/"
                src={LOGO_THUOCSI}
                width="164px"
                height="45px"
              />
            </Link>
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
              <Button id="loginMobile" variant="contained" btnType="warning" onClick={toggleLogin}>
                Đăng nhập
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.lSection}>
              <IconButton onClick={toggleDrawer(true)} aria-label="menu">
                <Menu />
              </IconButton>
              {router.pathname !== '/quick-order' && (
                <span className={styles.text}>{title && title} {itemCount && `(${itemCount})`}</span>
              )}
            </div>
            <div className={styles.rSection}>
              {router.pathname === '/quick-order' ? <HeaderWithSearchTool /> : <HeaderWithCart />}
            </div>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
              <div className={styles.drawer}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="close"
                  onClick={toggleDrawer(false)}
                >
                  <Close />
                </Fab>
                <SideBar />
              </div>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
});

export default HeaderMobile;
