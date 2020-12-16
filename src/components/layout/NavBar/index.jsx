import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { LocalOffer, Opacity, AddShoppingCart, Storefront, Whatshot } from '@material-ui/icons';
import LinkStyledClass from 'constants/Styled/Link/index';
import { Toggle } from '../../mocules';
// comp
import { LinkComp, TagComp } from '../../atoms';

const { LinkStyled } = LinkStyledClass;
// background
const useStyle = makeStyles({
  navbarClass: {
    padding: '10px',
    alignItems: 'center !important',
    background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
    position: 'sticky',
    top: 0,
    zIndex: 500,
  },
  navbarShrinClass: {
    padding: '10px',
    alignItems: 'center !important',
    background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
    position: 'sticky',
    top: 0,
    zIndex: 500,
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
  navBarRight: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: '10%',
  },
});

function onMouseOver(e) {
  e.target.style.background = 'red';
}

function renderMostSearched(data, classes) {
  if (!data || data.length === 0) {
    return null;
  }

  const listItems = data.map(({ name, id }) => (
    <TagComp name={name} key={`tags-${id}`} href="/" color="white" />
  ));
  return (
    <div className={classes.navBarContaint}>
      <Typography variant="h5" className={classes.textSearch}>
        <strong>Tìm Kiếm nhiều nhất</strong>
      </Typography>
      {listItems}
    </div>
  );
}

export default function NavBar({ mostResearched }) {
  const [isShrink] = useState(false);
  const classes = useStyle();
  const mostSearchedEle = renderMostSearched(mostResearched, classes);
  const navBarClass = isShrink ? classes.navbarClass : classes.navbarShrinClass;
  return (
    <div className={navBarClass}>
      <div className={classes.navBarContaint}>
        <LinkComp name="Sản phẩm" href="/" color="white" onMouseOver={onMouseOver}>
          <Storefront />
        </LinkComp>

        <LinkComp name="Hoạt Chất" href="/" color="white" onMouseOver={onMouseOver}>
          <Opacity />
        </LinkComp>

        <LinkComp name="Đặt Hàng Nhanh" href="/" color="white" onMouseOver={onMouseOver}>
          <AddShoppingCart />
        </LinkComp>

        <LinkComp name="Khuyến Mãi" href="/" color="white" onMouseOver={onMouseOver}>
          <Whatshot />
        </LinkComp>

        <LinkComp name="Mã Giảm Giá" href="/" color="white" onMouseOver={onMouseOver}>
          <LocalOffer />
        </LinkComp>
        <div className={classes.navBarRight}>
          <Toggle />
        </div>
      </div>
      {mostSearchedEle}
    </div>
  );
}
