import React from 'react';
import { Typography, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import TagType from '../TagType';

import styles from './styles.module.css';

const ProductCardContent = ({
  name,
  // image,
  // deal,
  // deal_price,
  // deal_start_day,
  // deal_end_day,
  tags,
  type,
  category,
  // price,
  // status,
  // price_percent,
}) => (
  <CardContent className={styles.product_content}>
    <a href="/">
      <Typography className={styles.product_name} gutterBottom variant="h5" component="h2">
        {name}
      </Typography>
    </a>
    <div className={styles.product_tags}>
      {tags.map((item) => (
        <TagType key={item + Math.random() + 1} type={item} />
      ))}
    </div>
    <Typography
      className={clsx(styles.product_type, styles.muted)}
      variant="body2"
      color="textSecondary"
      component="p"
    >
      {type}
    </Typography>
    <Typography
      className={clsx(styles.product_category, styles.muted)}
      variant="body2"
      color="textSecondary"
      component="p"
    >
      Nhóm:{' '}
      {category.map((item) => (
        <a key={item + Math.random() + 1} href="/">
          {item}
        </a>
      ))}
    </Typography>
  </CardContent>
);

export default ProductCardContent;
