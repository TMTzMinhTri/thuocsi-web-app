import React, { memo } from 'react';
import clsx from 'clsx';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from '@material-ui/core';
import { customerFeedbackData } from 'constants/data';

import styles from './styles.module.css';

const SideBar = () => {
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
            <FormatQuoteIcon className={clsx(styles.rotate, styles.quote)} />
            {item.comment}
            <FormatQuoteIcon className={styles.quote} />
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
        <div className={styles.sidebar__user_avatar} />

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
          <Link href="/">
            <a className={clsx(styles.sidebar__item_link, styles.active)} href="/">
              Trang chủ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Sản phẩm
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Hoạt chất
            </a>
          </Link>
        </li>
      </ul>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Trang chủ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Sản phẩm
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Hoạt chất
            </a>
          </Link>
        </li>
      </ul>
      <hr className={styles.hr} />
      <ul className={styles.items}>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Trang chủ
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Sản phẩm
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles.sidebar__item_link} href="/">
              Hoạt chất
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(SideBar);
