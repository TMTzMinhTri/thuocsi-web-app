import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  makeStyles,
  Typography,
  Badge,
  IconButton,
  Icon,
  Container,
  Tooltip,
} from '@material-ui/core';
import { LocalMallOutlined } from '@material-ui/icons';
import LinkStyledClass from 'constants/Styled/Link/index';
import { useCart, useAuth } from 'context';
import { LOGO_THUOCSI_SHORTENED } from 'constants/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { CART_URL, HOME_PAGE, PRODUCTS_URL } from 'constants/Paths';

import { Toggle, SearchInput } from 'components/mocules';

// comp
import { LinkComp, TagComp } from 'components/atoms';
import { MENU } from 'constants/data';
import styles from './styles.module.css';

const { LinkStyled } = LinkStyledClass;
// background
const useStyle = makeStyles({
  LinkStyled,
  textSearch: {
    color: 'white',
  },
  link_wrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  link: {
    position: 'relative',
    alignItems: 'center',
    padding: 9,
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

function renderMostSearched(data, classes) {
  if (!data || data.length === 0) {
    return null;
  }

  const listItems = data.map(({ name }) => (
    <TagComp name={name} key={`tags-${uuidv4()}`} href={HOME_PAGE} color="white" />
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

export default function NavBar({ mostResearched, point = 0, balance = 0 }) {
  const { itemCount } = useCart();
  const classes = useStyle();
  const router = useRouter();

  const { isAuthenticated, toggleLogin, toggleSignUp, toggleRegisterGuest } = useAuth();

  renderMostSearched(mostResearched, classes);

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

  const getActivePage = () => {
    if (
      router.pathname === '/products' ||
      router.pathname === '/categories/[slug]' ||
      router.pathname === '/manufacturers/[slug]'
    ) {
      return PRODUCTS_URL;
    }
    return router.pathname;
  };

  const getUrl = (url, redirectUrl) => {
    if (redirectUrl) {
      return redirectUrl;
    }
    return url;
  };

  return (
    <div ref={nav} className={styles.navBar}>
      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.navBarContaint}>
          <div className={styles.leftNavBar}>
            <div className={styles.logoNav}>
              <LinkComp href={HOME_PAGE}>
                <Image src={LOGO_THUOCSI_SHORTENED} width={38} height={38} />
              </LinkComp>
            </div>
            <div className={isAuthenticated ? styles.link_wrap : clsx(styles.link_wrap, styles.jc)}>
              {MENU.map((item) => (
                <LinkComp
                  className={clsx(
                    classes.link,
                    item.url === getActivePage(item.url) && styles.active,
                  )}
                  name={item.name}
                  href={getUrl(item.url, item.redirectUrl)}
                  color="white"
                  target={item.redirectUrl && '_blank'}
                  key={uuidv4()}
                >
                  {item.isNew && <span className={styles.badge}>Mới</span>}
                  <Icon className={`${item.icon} ${styles.navIcon}`} />
                </LinkComp>
              ))}
            </div>
          </div>

          {isAuthenticated ? (
            <>
              <SearchInput classCustom={styles.customWidth} className={styles.searchInput} />
              <div className={styles.navBarRight}>
                <LinkComp className={styles.navBarRightLink} href={CART_URL}>
                  <Tooltip title="Giỏ hàng" arrow>
                    <IconButton aria-label="cart">
                      <Badge
                        badgeContent={itemCount || 0}
                        invisible={itemCount === 0}
                        color="secondary"
                      >
                        <LocalMallOutlined className={styles.rIcon} />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </LinkComp>
                <Toggle balance={balance} point={point} />
              </div>
            </>
          ) : (
            <div className={styles.btn_no_auth_section}>
              <Tooltip title="Đăng nhập" arrow>
                <IconButton onClick={toggleLogin} className={classes.link}>
                  <FontAwesomeIcon className={styles.noAuthIcon} icon={faSignInAlt} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Tạo tài khoản" arrow>
                <IconButton onClick={toggleSignUp} className={classes.link}>
                  <FontAwesomeIcon className={styles.noAuthIcon} icon={faUser} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Đăng ký dùng thử" arrow>
                <IconButton onClick={toggleRegisterGuest} className={classes.link}>
                  <FontAwesomeIcon className={styles.noAuthIcon} icon={faEye} />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
