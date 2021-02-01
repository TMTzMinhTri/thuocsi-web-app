import React, { useRef, memo } from 'react';
import clsx from 'clsx';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Slider from 'react-slick';
import { Card, CardHeader, Avatar, CardContent, Typography, Container } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settingsCustomer, customerFeedbackData } from 'constants/data';

import styles from './styles.module.css';

const SliderComp = () => {
  const ref = useRef({});
  const sliderItem = customerFeedbackData.map((item) => (
    <div key={`slider-${item.id}`} className={styles.box}>
      <Card className={styles.root}>
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
    <div className={styles.wrapper_media}>
      <Container fixed>
        <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <h2 className={styles.title}>Khách hàng nói gì về thuocsi</h2>
          <Slider ref={ref} {...settingsCustomer}>
            {sliderItem}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default memo(SliderComp);
