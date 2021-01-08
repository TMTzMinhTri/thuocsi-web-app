import React from 'react';
import { Container, Icon, IconButton, AppBar, Toolbar, Badge } from '@material-ui/core';
import { Whatshot, AssignmentTurnedInOutlined, NotificationsNoneOutlined } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useAuth } from 'context';
import { Button } from '../../atoms';
import styles from './styles.module.css';

const FooterComp = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const toggleLoginMobile = () => {
    const link = document.getElementById('loginMobile');
    link.click();
  };

  return (
    <footer className={styles.bottom_bar}>
      <div className={styles.global_style}>
        <Container maxWidth="lg">
          {!isAuthenticated ? (
            <div className={styles.div_buttons}>
              <Button variant="contained" btnType="warning" onClick={toggleLoginMobile}>
                Đăng nhập
              </Button>
            </div>
          ) : (
            <AppBar position="fixed" className={styles.appBar}>
              <Toolbar>
                <div className={clsx(styles.icon, router.pathname === '/products' && styles.active)}>
                  <Link href="/products">
                    <IconButton edge="start" color="inherit">
                      <Icon className="icon-product" />
                      <span className={styles.text}>Sản phẩm</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={clsx(styles.icon, styles.promo, router.pathname === '/deals' && styles.active)}>
                  <Link href="/deals">
                    <IconButton edge="start" color="inherit">
                      <Whatshot />
                      <span className={styles.text}>Khuyến mãi</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={clsx(styles.icon_special, router.pathname === '/notifications' && styles.active)}>

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
                <div className={clsx(styles.icon, router.pathname === '/my-order' && styles.active)}>
                  <Link href="/my-order">
                    <IconButton color="inherit">
                      <AssignmentTurnedInOutlined />
                      <span className={styles.text}>Đơn hàng</span>
                    </IconButton>
                  </Link>
                </div>
                <div className={clsx(styles.icon, router.pathname === '/notifications' && styles.active)}>
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
