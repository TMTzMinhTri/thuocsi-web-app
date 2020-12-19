import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles, Typography, Badge, IconButton, Icon, Container } from '@material-ui/core';
import { LocalOffer, Whatshot, LocalMallOutlined } from '@material-ui/icons';
import LinkStyledClass from 'constants/Styled/Link/index';
import { useCart } from 'context';
import { LOGO_THUOCSI_SHORTENED } from 'constants/Images';
import { Toggle } from '../../mocules';
// comp
import { LinkComp, TagComp } from '../../atoms';
import styles from './styles.module.css';

const { LinkStyled } = LinkStyledClass;
// background
const useStyle = makeStyles({
  LinkStyled,
  textSearch: {
    color: 'white',
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
    <div className={styles.navBarContaint}>
      <Typography variant="h5" className={classes.textSearch}>
        <strong>Tìm Kiếm nhiều nhất</strong>
      </Typography>
      {listItems}
    </div>
  );
}

export default function NavBar({ mostResearched }) {
  const { itemCount } = useCart();
  const classes = useStyle();
  const mostSearchedEle = renderMostSearched(mostResearched, classes);
  const nav = useRef();

  useEffect(() => {
    if (!nav.current) return undefined;
    const currentNav = nav.current;
    const sticky = currentNav.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (typeof window !== 'undefined' && window.pageYOffset > sticky) {
        currentNav.classList.add(styles.sticky);
      } else {
        currentNav.classList.remove(styles.sticky);
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);

  return (
    <div ref={nav} className={styles.navBar}>
      <Container>
        <div className={styles.navBarContaint}>
          <div className={styles.logoNav}>
            <Link href="/">
              <Image src={LOGO_THUOCSI_SHORTENED} width={38} height={38} />
            </Link>
          </div>
          <LinkComp className={classes.link} name="Sản phẩm" href="/" color="white" onMouseOver={onMouseOver}>
            <Icon className={`icon-product ${styles.navIcon}`} />
          </LinkComp>

          <LinkComp className={classes.link} name="Hoạt Chất" href="/" color="white" onMouseOver={onMouseOver}>
            <Icon className={`icon-ingredients ${styles.navIcon}`} />
          </LinkComp>

          <LinkComp className={classes.link} name="Đặt Hàng Nhanh" href="/" color="white" onMouseOver={onMouseOver}>
            <Icon className={`icon-quick-order ${styles.navIcon}`} />
          </LinkComp>

          <LinkComp className={classes.link} name="Khuyến Mãi" href="/" color="white" onMouseOver={onMouseOver}>
            <Whatshot className={styles.navIcon} />
          </LinkComp>

          <LinkComp className={classes.link} name="Mã Giảm Giá" href="/" color="white" onMouseOver={onMouseOver}>
            <LocalOffer className={styles.navIcon} />
          </LinkComp>
          <div className={styles.navBarRight}>
            <LinkComp className={styles.navBarRightLink} href="/cart">
              <IconButton aria-label="cart">
                <Badge badgeContent={itemCount} invisible={false} color="secondary">
                  <LocalMallOutlined className={styles.rIcon} />
                </Badge>
              </IconButton>
            </LinkComp>
            <Toggle />
          </div>
        </div>
        {mostSearchedEle}
      </Container>
    </div>
  );
}
