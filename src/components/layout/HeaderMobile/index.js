import React, { memo, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Drawer, IconButton, Fab } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import { useAuth, useCart } from 'context';
import { LOGO_THUOCSI } from 'constants/Images';
import { QUICK_ORDER, CART_URL } from 'constants/Paths';
import { SignUpModal, SignInModal, ForgetPasswordModal, SideBar } from 'components/organisms';
import { LinkComp, ButtonHeader } from 'components/atoms';

import HeaderWithSearchTool from './components/HeaderWithSearchTool';
import HeaderWithCart from './components/HeaderWithCart';

import styles from './styles.module.css';

const HeaderMobile = memo(({ title = '' }) => {
  const {
    isAuthenticated,
    toggleLogin,
    isShowLogin,
    handleChangeForget,
    isShowForgetPassword,
    toggleForgetPassword,
    isShowSignUp,
    toggleSignUp,
    handleChangeSignIn,
    handleChangeSignUp,
  } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const { itemCount } = useCart();

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
          router.pathname === QUICK_ORDER ? styles.search_tool_wrapper : '',
          router.pathname === CART_URL ? styles.cart_wrapper : '',
        )}
      >
        {!isAuthenticated ? (
          <>
            <LinkComp href="/">
              <Image
                className={styles.logo}
                href="/"
                src={LOGO_THUOCSI}
                width="164px"
                height="45px"
              />
            </LinkComp>
            <SignInModal
              visible={isShowLogin}
              onClose={toggleLogin}
              onChangeForget={handleChangeForget}
              onChangeSignUp={handleChangeSignUp}
            />
            <ForgetPasswordModal visible={isShowForgetPassword} onClose={toggleForgetPassword} />
            <SignUpModal
              visible={isShowSignUp}
              onClose={toggleSignUp}
              onChangeSignIn={handleChangeSignIn}
            />

            <div className={styles.div_buttons}>
              <ButtonHeader
                id="loginMobile"
                variant="contained"
                btnType="warning"
                onClick={toggleLogin}
              >
                Đăng nhập
              </ButtonHeader>
            </div>
          </>
        ) : (
          <>
            <div className={styles.lSection}>
              <IconButton onClick={toggleDrawer(true)} aria-label="menu">
                <Menu />
              </IconButton>
              {router.pathname !== QUICK_ORDER && (
                <span className={styles.text}>
                  {title && title} {itemCount && `(${itemCount})`}
                </span>
              )}
            </div>
            <div className={styles.rSection}>
              {router.pathname === QUICK_ORDER ? <HeaderWithSearchTool /> : <HeaderWithCart />}
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
