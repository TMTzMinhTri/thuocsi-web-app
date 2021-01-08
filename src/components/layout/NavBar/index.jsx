import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from 'hooks';
import { makeStyles, Typography, Badge, IconButton, Icon, Container, Tooltip } from '@material-ui/core';
import { LocalOffer, Whatshot, LocalMallOutlined } from '@material-ui/icons';
import LinkStyledClass from 'constants/Styled/Link/index';
import { useCart, useAuth } from 'context';
import { LOGO_THUOCSI_SHORTENED } from 'constants/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { SignUpModal, SignInModal, ForgetPasswordModal } from '../../organisms';
import { Toggle, SearchInput } from '../../mocules';

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
  link_wrap: {
    display: 'flex',
  },
  link: {
    position: 'relative',
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

export default function NavBar({ mostResearched, point = 0, balance = 0, pageName = [] }) {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { itemCount } = useCart();
  const classes = useStyle();
  const { isAuthenticated } = useAuth();

  renderMostSearched(mostResearched, classes);
  const nav = useRef();

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);

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
      <Container className={styles.container}>
        <div className={styles.navBarContaint}>
          <div className={styles.leftNavBar}>
            <div className={styles.logoNav}>
              <Link href="/">
                <Image src={LOGO_THUOCSI_SHORTENED} width={38} height={38} />
              </Link>
            </div>
            <div className={classes.link_wrap}>
              <LinkComp
                className={clsx(
                  classes.link,
                  (pageName === 'products'
                    || pageName === 'manufacturers'
                    || pageName === 'categories')
                    && styles.active,
                )}
                name="Sản phẩm"
                href="/products?current_tab=new_arrival"
                color="white"
              >
                <Icon className={`icon-product ${styles.navIcon}`} />
              </LinkComp>

              <LinkComp
                className={clsx(classes.link, pageName === 'ingredients' && styles.active)}
                name="Hoạt Chất"
                href="/ingredients"
                color="white"
              >
                <Icon className={`icon-ingredients ${styles.navIcon}`} />
              </LinkComp>

              <LinkComp
                className={clsx(classes.link, pageName === 'quick-order' && styles.active)}
                name="Đặt Hàng Nhanh"
                href="/quick-order"
                color="white"
              >
                <Icon className={`icon-quick-order ${styles.navIcon}`} />
              </LinkComp>

              <LinkComp
                className={clsx(classes.link, pageName === 'deals' && styles.active)}
                name="Khuyến Mãi"
                href="/deals"
                color="white"
              >
                <Whatshot className={styles.navIcon} />
              </LinkComp>

              <LinkComp
                className={clsx(classes.link, pageName === 'promo-codes' && styles.active)}
                name="Mã Giảm Giá"
                href="/promo-codes"
                color="white"
              >
                <span className={styles.badge}>Mới</span>
                <LocalOffer className={styles.navIcon} />
              </LinkComp>
            </div>
          </div>

          {isAuthenticated ? (
            <>
              <SearchInput
                classCustom={styles.customWidth}
                className={styles.searchInput}
              />
              <div className={styles.navBarRight}>
                <LinkComp className={styles.navBarRightLink} href="/cart">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={itemCount} invisible={false} color="secondary">
                      <LocalMallOutlined className={styles.rIcon} />
                    </Badge>
                  </IconButton>
                </LinkComp>
                <Toggle balance={balance} point={point} />
              </div>
            </>
          ) : (
            <>
              <SignInModal
                visible={isShowingLogin}
                onClose={toggleLogin}
                onChangeForget={handleChangeForget}
              />
              <ForgetPasswordModal
                visible={isShowingForgetPassword}
                onClose={toggleForgetPassword}
              />
              <SignUpModal
                visible={isShowingSignUp}
                onClose={toggleSignUp}
                onChangeSignIn={handleChangeSignIn}
              />
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
              </div>
            </>
          )}
        </div>
        {/* {mostSearchedEle} */}
      </Container>
    </div>
  );
}
