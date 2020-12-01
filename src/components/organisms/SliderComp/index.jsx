import React, { useRef } from 'react';
import clsx from 'clsx';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Slider from 'react-slick';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Box,
} from '@material-ui/core';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { settingsCustomer } from 'constants/data';
import styles from './styles.module.css';

const SliderComp = ({ feedback }) => {
  const ref = useRef({});

  const sliderItem = feedback.map((item) => (
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
  ));
  return (
    <Box className={styles.wrapper_media} component="div">
      <Box maxWidth="1140px" m="auto">
        <Box pt={5} pb={10}>
          <Box
            className={styles.center}
            component="h2"
            fontSize="32px"
            color="#00b46e"
            fontWeight="fontWeightMedium"
          >
            Khách hàng nói gì về thuocsi
          </Box>
          <Slider ref={ref} {...settingsCustomer}>
            {sliderItem}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderComp;
