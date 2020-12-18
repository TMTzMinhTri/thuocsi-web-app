import React, { useState } from 'react';
import { makeStyles, Typography, Badge, IconButton, Icon } from '@material-ui/core';
import { LocalOffer, Whatshot, LocalMallOutlined } from '@material-ui/icons';
import LinkStyledClass from 'constants/Styled/Link/index';
import { useCart } from 'context';
import { Toggle } from '../../mocules';
// comp
import { LinkComp, TagComp } from '../../atoms';

const { LinkStyled } = LinkStyledClass;
// background
const useStyle = makeStyles({
  navbarClass: {
    padding: 1,
    alignItems: 'center !important',
    background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
    position: 'sticky',
    top: 0,
    zIndex: 500,
  },
  navbarShrinClass: {
    padding: 1,
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
  link: {
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    transition: 'all 0.5s',
    '&:hover': {
      borderBottomColor: '#fbcb5b',
    },
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: 16,
    },
  },
  navIcon: {
    fontSize: 19,
    width: 'auto',
    height: 19,
    marginRight: 10,
  },
  rIcon: {
    color: '#fff',
    fontSize: 22,
  },
  navBarRightLink: {
    marginRight: 10,
    padding: 0,
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
  const { itemCount } = useCart();
  const classes = useStyle();
  const mostSearchedEle = renderMostSearched(mostResearched, classes);
  const navBarClass = isShrink ? classes.navbarClass : classes.navbarShrinClass;
  return (
    <div className={navBarClass}>
      <div className={classes.navBarContaint}>
        <LinkComp className={classes.link} name="Sản phẩm" href="/" color="white" onMouseOver={onMouseOver}>
          <Icon className={`icon-product ${classes.navIcon}`} />
        </LinkComp>

        <LinkComp className={classes.link} name="Hoạt Chất" href="/" color="white" onMouseOver={onMouseOver}>
          <Icon className={`icon-ingredients ${classes.navIcon}`} />
        </LinkComp>

        <LinkComp className={classes.link} name="Đặt Hàng Nhanh" href="/" color="white" onMouseOver={onMouseOver}>
          <Icon className={`icon-quick-order ${classes.navIcon}`} />
        </LinkComp>

        <LinkComp className={classes.link} name="Khuyến Mãi" href="/" color="white" onMouseOver={onMouseOver}>
          <Whatshot className={classes.navIcon} />
        </LinkComp>

        <LinkComp className={classes.link} name="Mã Giảm Giá" href="/" color="white" onMouseOver={onMouseOver}>
          <LocalOffer className={classes.navIcon} />
        </LinkComp>
        <div className={classes.navBarRight}>
          <LinkComp className={classes.navBarRightLink} href="/cart">
            <IconButton aria-label="cart">
              <Badge badgeContent={itemCount} invisible={false} color="secondary">
                <LocalMallOutlined className={classes.rIcon} />
              </Badge>
            </IconButton>
          </LinkComp>
          <Toggle />
        </div>
      </div>
      {mostSearchedEle}
    </div>
  );
}
