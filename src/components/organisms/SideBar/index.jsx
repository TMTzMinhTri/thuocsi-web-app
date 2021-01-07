import React, { memo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Icon,
} from '@material-ui/core';
import { LocalOffer, Whatshot, AccountCircle, AssignmentTurnedIn, Share, MonetizationOn, Facebook, FormatQuote } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { customerFeedbackData } from 'constants/data';
import {
  LINK_REGISTER,
  LOGO_FOOTER_REGISTER,
} from 'constants/Images';
import { LinkComp } from '../../atoms';

import styles from './styles.module.css';

const SideBar = ({ pageName = '/' }) => {
  // eslint-disable-next-line no-unused-vars
  const sliderItem = customerFeedbackData.map((item) => (
    <div className={styles.box}>
      <Card key={`slider-${item.id}`} className={styles.root}>
        <CardHeader
          avatar={<Avatar src={item.avatar} aria-label="recipe" className={styles.large} />}
          title={item.customer}
          subheader={item.title}
          className={styles.card_header}
          classes={{
            title: styles.header_customer,
            subheader: styles.header_title,
          }}
        />
        <CardContent className={styles.card_content}>
          <Typography
            className={styles.comment_style}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <FormatQuote className={clsx(styles.rotate, styles.quote)} />
            {item.comment}
            <FormatQuote className={styles.quote} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));
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
          <div className={styles.sidebar__user_bonus_point_amount}>0</div>
        </div>
      </div>
      <div className={styles.sidebar__user_name}>
        <b>An</b>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(
              styles.sidebar__item_link,
              (pageName === '/') && styles.active,
            )}
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
              (pageName === 'products' || pageName === 'manufacturers' || pageName === 'categories') && styles.active,
            )}
            name="Sản phẩm"
            href="/products?current_tab=new_arrival"
            color="white"
          >
            <Icon className={`icon-product ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp className={clsx(styles.sidebar__item_link, pageName === 'ingredients' && styles.active)} name="Hoạt Chất" href="/ingredients" color="white">
            <Icon className={`icon-ingredients ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'quick-order' && styles.active)}
            name="Đặt Hàng Nhanh"
            href="/quick-order"
            color="white"
          >
            <Icon className={`icon-quick-order ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp className={clsx(styles.sidebar__item_link, pageName === 'deals' && styles.active)} name="Khuyến Mãi" href="/deals" color="white">
            <Whatshot className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'promo-codes' && styles.active)}
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
            className={clsx(styles.sidebar__item_link, pageName === 'account-info' && styles.active)}
            name="Thông tin tài khoản"
            href="/my-account"
            color="white"
          >
            <AccountCircle className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'my-order' && styles.active)}
            name="Đơn hàng của tôi"
            href="/my-order"
            color="white"
          >
            <AssignmentTurnedIn className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'referrals' && styles.active)}
            name="Giới thiệu bạn bè"
            href="/users/referrals"
            color="white"
          >
            <Share className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'user-promo-codes' && styles.active)}
            name="Mã giảm giá của tôi"
            href="/users/user-promo-codes"
            color="white"
          >
            <LocalOffer className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'loyalty_points' && styles.active)}
            name="Điểm tích lũy"
            href="/users/loyalty_points"
            color="white"
          >
            <MonetizationOn className={styles.navIcon} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'sign_out' && styles.active)}
            name="Đăng xuất"
            href="/accounts/sign_out"
            color="white"
          >
            <FontAwesomeIcon className={styles.navIcon} icon={faSignOutAlt} />
          </LinkComp>
        </li>
      </ul>
      <hr className={styles.hr} />
      <h4 className={styles.sidebar__header}>Liên hệ</h4>
      <ul className={styles.items}>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'customer-support' && styles.active)}
            name="Hỗ trợ khách hàng"
            href="/customer-support"
            color="white"
          >
            <FontAwesomeIcon className={styles.navIcon} icon={faInfoCircle} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'faq' && styles.active)}
            name="Câu hỏi thường gặp"
            href="/faq"
            color="white"
          >
            <Icon className={`icon-help ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'customer-support' && styles.active)}
            name="hotro@thuocsi.vn"
            href="mailto:hotro@thuocsi.vn"
            color="white"
          >
            <Icon className={`icon-mail ${styles.navIcon}`} />
          </LinkComp>
        </li>
        <li>
          <LinkComp
            className={clsx(styles.sidebar__item_link, pageName === 'contact_us' && styles.active)}
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
