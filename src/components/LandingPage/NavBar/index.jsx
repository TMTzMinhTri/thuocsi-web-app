import React from 'react';
import Link from 'next/link';
import { makeStyles, Typography } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import OpacityIcon from '@material-ui/icons/Opacity';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import StoreIcon from '@material-ui/icons/Storefront';
import WhatShotIcon from '@material-ui/icons/Whatshot';
import LinkStyledClass from '../../../constants/Styled/Link/index';

const { LinkStyled } = LinkStyledClass;
const useStyle = makeStyles({
  navbarClass: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center !important',
    justifyContent: 'space-between !important',
    background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
  },
  navBarContaint: {
    display: 'flex',
  },
  LinkStyled,
});

export default function Navbar() {
  const classes = useStyle();
  return (
    <div className={classes.navbarClass}>
      <div className={classes.navBarContaint}>
        <Link href="/" className={classes.LinkStyled}>
          <a className={classes.LinkStyled} href="/">
            <StoreIcon />
            <Typography>Sản phẩm</Typography>
          </a>
        </Link>
        <Link href="/">
          <a className={classes.LinkStyled} href="/">
            <OpacityIcon />
            <Typography>Hoạt Chất</Typography>
          </a>
        </Link>
        <Link href="/">
          <a className={classes.LinkStyled} href="/">
            <CartIcon />
            <Typography>Đặt Hàng Nhanh</Typography>
          </a>
        </Link>
        <Link href="/">
          <a className={classes.LinkStyled} href="/">
            <WhatShotIcon />
            <Typography>Khuyến Mãi</Typography>
          </a>
        </Link>
        <Link href="/">
          <a className={classes.LinkStyled} href="/">
            <LocalOfferIcon />
            <Typography>Mã Giảm Giá</Typography>
          </a>
        </Link>
      </div>
    </div>
  );
}
