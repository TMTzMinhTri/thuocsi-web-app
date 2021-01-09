import React, { memo } from 'react';
import Link from 'next/link';
import { IconButton, Badge } from '@material-ui/core';
import { Search, LocalMallOutlined } from '@material-ui/icons';
import { useCart } from 'context';

import { LinkComp } from '../../../atoms';

import styles from '../styles.module.css';

const HeaderWithCart = memo(() => {
  const { itemCount } = useCart();
  return (
    <div className={styles.headerWithCart}>
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
    </div>
  );
});

export default HeaderWithCart;
