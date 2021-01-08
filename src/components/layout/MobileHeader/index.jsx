import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from 'hooks';
import { Drawer, IconButton, Badge, Fab } from '@material-ui/core';
import { Search, Menu, Close, LocalMallOutlined } from '@material-ui/icons';
import { LOGO_THUOCSI } from 'constants/Images';
import { SignUpModal, SignInModal, ForgetPasswordModal, SideBar } from 'components/organisms';
import { useCart, useAuth } from 'context';
import clsx from 'clsx';

import { LinkComp, Button } from '../../atoms';

import styles from './styles.module.css';

const MobileHeader = memo(({ title = '' }) => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { isAuthenticated } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
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
      <div className={clsx(styles.login, isAuthenticated && styles.logged)}>

        {!isAuthenticated ? (
          <>
            <Link href="/">
              <Image className={styles.logo} href="/" src={LOGO_THUOCSI} width="164px" height="45px" />
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
              <IconButton onClick={toggleDrawer(true)} aria-label="menu"><Menu /></IconButton>
              <span className={styles.text}>{title && title}</span>
            </div>
            <div className={styles.rSection}>
              <Link href="/quick-order">
                <IconButton className={styles.icon} aria-label="search"><Search /></IconButton>
              </Link>
              <LinkComp className={styles.navBarRightLink} href="/cart">
                <IconButton aria-label="cart">
                  <Badge badgeContent={itemCount} invisible={false} color="secondary">
                    <LocalMallOutlined className={styles.rIcon} />
                  </Badge>
                </IconButton>
              </LinkComp>
            </div>
            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
              <div className={styles.drawer}>
                <Fab size="small" color="secondary" aria-label="close" onClick={toggleDrawer(false)}><Close /></Fab>
                <SideBar />
              </div>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
});

export default MobileHeader;
