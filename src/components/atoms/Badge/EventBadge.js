import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const EventBadge = () => (
  <a
    href="https://thuocsi.vn/events/nguoi-viet-dung-hang-viet-nhan-1-5-diem-tich-luy"
    className={clsx(styles.badge_product, styles.event_badge)}
  >
    x1.5 Điểm Tích Lũy
  </a>
);

export default EventBadge;
