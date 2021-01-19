import React, { memo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Icon } from '@material-ui/core';
import {
  LocalOffer,
  Whatshot,
  AccountCircle,
  AssignmentTurnedIn,
  Share,
  MonetizationOn,
  Facebook,
} from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { LINK_REGISTER, LOGO_FOOTER_REGISTER } from 'constants/Images';
import { useRouter } from 'next/router';
import { useAuth, useCart } from 'context';
import { LinkComp } from '../../atoms';

import styles from './styles.module.css';

const SideBar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const handleLogout = () => {
    logout();
    clearCart();
  };
  return (
    <nav className={styles.sidebar_content}>
      <div className={styles.sidebar__user}>
        <div className={styles.sidebar__user_wallet}>
          Ví điện tử
          <div className={styles.sidebar__user_wallet_amount}>
            0<span className={styles.unit}>đ</span>
          </div>
        </div>
        <div className={styles.sidebar__user_avatar}>
          <Image
            className="header_user_avatar_image"
            src="/images/avatar/user_avatar_default.svg"
            width={64}
            height={64}
          />
        </div>

        <div className={styles.sidebar__user_bonus_point}>
          Điểm thưởng
          <div className={styles.sidebar__user_bonus_point_amount}>
            {user.point ? user.point : 0}
          </div>
        </div>
      </div>
      <div className={styles.sidebar__user_name}>
        <b>{user?.name || ''}</b>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/' && styles.active)}
            name="Trang chủ"
            href="/"
            color="white"
          >
            <Icon className={`icon-home ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              (router.pathname === '/products'
                || router.pathname === '/manufacturers'
                || router.pathname === '/categories')
                && styles.active,
            )}
            name="Sản phẩm"
            href="/products?current_tab=new_arrival"
            color="white"
          >
            <Icon className={`icon-product ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/ingredients' && styles.active,
            )}
            name="Hoạt Chất"
            href="/ingredients"
            color="white"
          >
            <Icon className={`icon-ingredients ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/quick-order' && styles.active,
            )}
            name="Đặt Hàng Nhanh"
            href="/quick-order"
            color="white"
          >
            <Icon className={`icon-quick-order ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/deals' && styles.active,
            )}
            name="Khuyến Mãi"
            href="/deals"
            color="white"
          >
            <Whatshot className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/promo-codes' && styles.active,
            )}
            name="Mã Giảm Giá"
            href="/promo-codes"
            color="white"
          >
            <LocalOffer className={styles.navIcon} />
            <span className={styles.badge}>Mới</span>
          </LinkComp>
        </li>
      </ul>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/account-info' && styles.active,
            )}
            name="Thông tin tài khoản"
            href="/my-account"
            color="white"
          >
            <AccountCircle className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/my-order' && styles.active,
            )}
            name="Đơn hàng của tôi"
            href="/my-order"
            color="white"
          >
            <AssignmentTurnedIn className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/referrals' && styles.active,
            )}
            name="Giới thiệu bạn bè"
            href="/users/referrals"
            color="white"
          >
            <Share className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/user-promo-codes' && styles.active,
            )}
            name="Mã giảm giá của tôi"
            href="/users/user-promo-codes"
            color="white"
          >
            <LocalOffer className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/loyalty_points' && styles.active,
            )}
            name="Điểm tích lũy"
            href="/users/loyalty_points"
            color="white"
          >
            <MonetizationOn className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <div onClick={handleLogout} role="presentation" className={styles.sidebar__item_link}>
            <FontAwesomeIcon className={styles.navIcon} icon={faSignOutAlt} />
            <p className="MuiTypography-root MuiTypography-body2">Đăng xuất</p>
          </div>
        </li>
      </ul>
      <hr className={styles.hr} />
      <h4 className={styles.sidebar__header}>Liên hệ</h4>
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/customer-support' && styles.active,
            )}
            name="Hỗ trợ khách hàng"
            href="/customer-support"
            color="white"
          >
            <FontAwesomeIcon className={styles.navIcon} icon={faInfoCircle} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, router.pathname === '/faq' && styles.active)}
            name="Câu hỏi thường gặp"
            href="/faq"
            color="white"
          >
            <Icon className={`icon-help ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/customer-support' && styles.active,
            )}
            name="hotro@thuocsi.vn"
            href="mailto:hotro@thuocsi.vn"
            color="white"
          >
            <Icon className={`icon-mail ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              router.pathname === '/contact_us' && styles.active,
            )}
            name="02 873 008 840"
            href="tel:02873008840"
            color="white"
          >
            <Icon className={`icon-phone ${styles.navIcon}`} />
          </LinkComp>
        </li>
      </ul>
      <div className={styles.contact_more}>
        <div className={styles.open_hours}>Từ T2 đến T6: 8:00 - 18:00</div>
        <a
          className={styles.fb}
          href="https://www.facebook.com/thuocsivn/"
          rel="noreferrer"
          target="_blank"
        >
          <Facebook fontSize="large" />
        </a>
        <a href={LINK_REGISTER} target="_blank" rel="noreferrer">
          <div className={styles.mt2}>
            <Image src={LOGO_FOOTER_REGISTER} width="133" height="49" />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default memo(SideBar);
