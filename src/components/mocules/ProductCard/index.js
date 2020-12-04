import React from 'react';
import {
  Card,
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { MinusButton, PlusButton, RibbonPriceUp, InputComp, TagType } from 'components';
import styles from './styles.module.css';

const ProductCard = ({ product }) => {
  const {
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
    // not_support_delivery,
  } = product;
  return (
    <Box className={styles.button_container}>
      <Box className={styles.root_card}>
        <RibbonPriceUp />
        <Card className={styles.product_card}>
          <CardActionArea className={styles.product_image}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/images/slider/slider01.png    "
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardContent className={styles.product_content}>
            <a href="/">
              <Typography className={styles.product_name} gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
            </a>
            <div className={styles.product_tags}>
              {tags.map((item) => (
                <TagType type={item} />
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
                <a href="/">{item}</a>
              ))}
            </Typography>
          </CardContent>
          <CardActions className={styles.product_action}>
            <MinusButton />
            <InputComp />
            <PlusButton />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCard;
