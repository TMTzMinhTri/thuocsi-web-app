import React, { useCallback } from 'react';
import { Container, Icon, IconButton, AppBar, Toolbar, Badge } from '@material-ui/core';
import { useModal } from 'hooks';
import { SignUpModal, SignInModal, ForgetPasswordModal } from 'components/organisms';
import { Whatshot, AssignmentTurnedInOutlined, NotificationsNoneOutlined } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import Link from 'next/link';
import clsx from 'clsx';
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
          {!isAuthenticated ? (
            <>
              <SignInModal
                visible={isShowingLogin}
                onClose={toggleLogin}
                onChangeForget={handleChangeForget}
              />
              <ForgetPasswordModal
                visible={isShowingForgetPassword}
                onClose={toggleForgetPassword}
              />
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
          ) : (
            <AppBar position="fixed" className={styles.appBar}>
              <Toolbar>
                <div className={clsx(styles.icon, styles.active)}>
                  <Link href="/products">
                    <IconButton edge="start" color="inherit">
                      <Icon className="icon-product" />
                      <span className={styles.text}>Sản phẩm</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={clsx(styles.icon, styles.promo)}>
                  <Link href="/deals">
                    <IconButton edge="start" color="inherit">
                      <Whatshot />
                      <span className={styles.text}>Khuyến mãi</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={styles.icon_special}>

                  <Link href="/quick-order">
                    <>
                      <Fab aria-label="icon-quick-order" className={styles.fabButton}>
                        <Icon className="icon-quick-order" />
                      </Fab>
                      <span className={styles.text}>Đặt nhanh</span>
                    </>
                  </Link>
                </div>
                <div className={styles.grow} />
                <div className={styles.icon}>
                  <Link href="/my-orders">
                    <IconButton color="inherit">
                      <AssignmentTurnedInOutlined />
                      <span className={styles.text}>Đơn hàng</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={styles.icon}>
                  <Link href="/notifications">
                    <IconButton edge="end" color="inherit">
                      <Badge badgeContent=" " variant="dot" color="secondary">
                        <NotificationsNoneOutlined />
                      </Badge>
                      <span className={styles.text}>Thông báo</span>
                    </IconButton>
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(FooterComp);
