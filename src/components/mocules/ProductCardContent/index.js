import React from 'react';
import { Typography, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import TagType from '../TagType';
import SellerInfo from '../SellerInfo';
import styles from './styles.module.css';

const ProductCardContent = ({
  name,
  // image,
  // deal,
  // deal_price,
  // deal_start_day,
  // deal_end_day,
  tags,
  unit,
  volume,
  cate,
  category = [],
  // price,
  // status,
  // price_percent,
  row,
  slug,
  tag,
  // cart,
  className,
  isMobile,
  seller = '',
}) => (
  <CardContent
    className={`${className}
      ${
        row ? styles.product_content : clsx(styles.product_content, styles.product_content_column)
      }`}
  >
    <div
      className={
        row
          ? styles.product_title_wrap
          : clsx(styles.product_title_wrap, styles.product_title_column_wrap)
      }
    >
      <div className={row ? clsx(styles.product_title, styles.h40) : styles.product_title}>
        <Link href={`/product/${slug}`}>
          <Typography className={styles.product_name} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </Link>

        <SellerInfo seller={seller} />

        {isMobile && (
          <Typography
            className={clsx(styles.product_type, styles.muted)}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {unit} {volume}
          </Typography>
        )}
        {tag && tags && tags[0] && (
          <div className={clsx(styles.product_tags, styles.product_tags_column)}>
            {tags.map((item) => (
              <TagType key={uuidv4()} item={item} />
            ))}
          </div>
        )}
      </div>
      {!isMobile && (
        <Typography
          className={
            row
              ? clsx(styles.product_type, styles.muted)
              : clsx(styles.product_type, styles.muted, styles.align_center)
          }
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {unit} {volume}
        </Typography>
      )}
    </div>
    {row === cate && category &&(
      <Typography
        className={clsx(styles.product_category, styles.muted)}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        Nhóm:{' '}
        {category.map((item) => (
          <a key={uuidv4()} href={`/categories/${item.slug}`}>
            {item.name}
          </a>
        ))}
      </Typography>
    )}
  </CardContent>
);

export default ProductCardContent;
