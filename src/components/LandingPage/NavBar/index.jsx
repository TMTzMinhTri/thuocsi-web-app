import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import OpacityIcon from '@material-ui/icons/Opacity';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import StoreIcon from '@material-ui/icons/Storefront';
import WhatShotIcon from '@material-ui/icons/Whatshot';
import LinkStyledClass from '../../../constants/Styled/Link/index';
// comp
import LinkComp from '../../LinkComp/index';
import TagsComp from '../../Tags/index';

const { LinkStyled } = LinkStyledClass;
// background
const useStyle = makeStyles({
  navbarClass: {
    padding: '10px',
    alignItems: 'center !important',
    background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
  },
  navBarContaint: {
    display: 'flex',
    alignItems: 'center !important',
    marginLeft: '10%',
  },
  LinkStyled,
  textSearch: {
    color: 'white',
  },
});

function onMouseOver(e) {
  e.target.style.background = 'red';
}

export default function Navbar() {
  const classes = useStyle();
  return (
    <div className={classes.navbarClass}>
      <div className={classes.navBarContaint}>
        <LinkComp name="Sản phẩm" href="/" color="white" onMouseOver={onMouseOver}>
          <StoreIcon />
        </LinkComp>

        <LinkComp name="Hoạt Chất" href="/" color="white" onMouseOver={onMouseOver}>
          <OpacityIcon />
        </LinkComp>

        <LinkComp name="Đặt Hàng Nhanh" href="/" color="white" onMouseOver={onMouseOver}>
          <CartIcon />
        </LinkComp>

        <LinkComp name="   Khuyến Mãi" href="/" color="white" onMouseOver={onMouseOver}>
          <WhatShotIcon />
        </LinkComp>

        <LinkComp name="Mã Giảm Giá" href="/" color="white" onMouseOver={onMouseOver}>
          <LocalOfferIcon />
        </LinkComp>
      </div>
      <div className={classes.navBarContaint}>
        <Typography variant="h5" className={classes.textSearch}>
          <strong>Tìm Kiếm nhiều nhất</strong>
        </Typography>
        <TagsComp name="#Mega" href="/" color="white" />
        <TagsComp name="#Dermatix" href="/" color="white" />
        <TagsComp name="#Rohto" href="/" color="white" />
        <TagsComp name="#Pfizer" href="/" color="white" />
        <TagsComp name="#Greencross" href="/" color="white" />
        <TagsComp name="#Cetaphill" href="/" color="white" />
      </div>
    </div>
  );
}
