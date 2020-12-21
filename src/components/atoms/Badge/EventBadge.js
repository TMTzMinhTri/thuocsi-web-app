import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

const EventBadge = ({ children, url }) => (
  <a href={url} className={clsx(styles.badge_product, styles.event_badge)}>
    {children}
  </a>
);

export default EventBadge;
