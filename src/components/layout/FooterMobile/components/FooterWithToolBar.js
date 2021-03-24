import React from 'react';
import { Icon, IconButton, Toolbar, Badge } from '@material-ui/core';
import { Whatshot, AssignmentTurnedInOutlined, NotificationsNoneOutlined } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from '../styles.module.css';

const FooterWithToolBar = () => {
  const router = useRouter();
  return (
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
      <div className={clsx(styles.icon_special, router.pathname === '/quick-order' && styles.active)}>
        <Link href="/quick-order">
          <div className={styles.qordericon}>
            <Fab aria-label="icon-quick-order" className={styles.fabButton}>
              <Icon className="icon-quick-order" />
            </Fab>
            <span className={styles.text}>Đặt nhanh</span>
          </div>
        </Link>
      </div>
      <div className={styles.grow} />
      <div className={clsx(styles.icon, router.pathname === '/my-order' && styles.active)}>
        <Link href="/discovery">
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
  );
};

export default React.memo(FooterWithToolBar);
