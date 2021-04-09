import React, { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IconButton, Badge } from '@material-ui/core';
import { Search, LocalMallOutlined } from '@material-ui/icons';

import { useCart } from 'context';
import { LinkComp } from 'components/atoms';
import { QUICK_ORDER, CART_URL } from 'constants/Paths';

import styles from '../styles.module.css';

const HeaderWithCart = memo(() => {
  const { itemCount } = useCart();
  const router = useRouter();
  return (
    <div className={styles.headerWithCart}>
      <div className={styles.rSection}>
        <Link href={QUICK_ORDER} prefetch={false}>
          <IconButton className={styles.icon} aria-label="search">
            <Search />
          </IconButton>
        </Link>
        {router.pathname !== CART_URL && (
          <LinkComp className={styles.navBarRightLink} href={CART_URL} prefetch={false}>
            <IconButton aria-label="cart">
              <Badge badgeContent={itemCount} invisible={false} color="secondary">
                <LocalMallOutlined className={styles.rIcon} />
              </Badge>
            </IconButton>
          </LinkComp>
        )}
      </div>
    </div>
  );
});

export default HeaderWithCart;
