import React from 'react';
import { Typography, CardContent, Box } from '@material-ui/core';
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
  row,
  tag,
  // cart,
  className,
}) => (
  <CardContent
    className={`${className}
      ${
        row ? styles.product_content : clsx(styles.product_content, styles.product_content_column)
      }`}
  >
    <Box
      className={
        row
          ? styles.product_title_wrap
          : clsx(styles.product_title_wrap, styles.product_title_column_wrap)
      }
    >
      <Box className={styles.product_title}>
        <a href="/">
          <Typography className={styles.product_name} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </a>
        {tag && (
        <div className={clsx(styles.product_tags, styles.product_tags_column)}>
          {tags.map((item) => (
            <TagType key={item + Math.random() + 1} type={item} />
          ))}
        </div>
        )}
      </Box>
      <Typography
        className={clsx(styles.product_type, styles.muted)}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {type}
      </Typography>
    </Box>
    {(row === category) && (
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
    )}
  </CardContent>
);

export default ProductCardContent;
