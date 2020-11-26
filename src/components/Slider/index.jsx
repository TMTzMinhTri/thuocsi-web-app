import React, { useRef } from 'react';
import clsx from 'clsx';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Slider from 'react-slick';
import {
  Card,
  makeStyles,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Box,
} from '@material-ui/core';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 555,
    height: 224,
    margin: 8,
    boxShadow: '0 0 18px -10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  large: {
    width: '80px',
    height: '80px',
  },
  CardHeader: {
    paddingBottom: '0!important',
    paddingTop: 24,
  },
  headerCustomer: {
    position: 'relative',
    top: -15,
    fontSize: 20,
    color: '#00b46e',
    fontWeight: 'bold',
  },
  headerTitle: {
    position: 'relative',
    top: -15,
    fontSize: 16,
    color: '#919aa3',
  },
  wrapperMedia: {
    backgroundColor: '#f4f7fc',
  },
  cardContent: {
    position: 'relative',
    top: -20,
    paddingLeft: '112px',
    paddingRight: '20px',
    paddingTop: 0,
  },
  commentStyle: {
    fontSize: '16px',
    fontStyle: 'italic',
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
  quote: {
    fontSize: '1.2rem',
    color: '#00b46e',
    opacity: 0.2,
  },
  center: {
    textAlign: 'center',
  },
}));

const SliderComp = ({ feedback }) => {
  const classes = useStyles();

  const ref = useRef({});

  const settings = {
    className: 'section-outstanding__slider',
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    arrows: false,
    infinite: true,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const sliderItem = feedback.map((item) => (
    <Card key={`slider-${item.id}`} className={classes.root}>
      <CardHeader
        avatar={<Avatar src={item.avatar} aria-label="recipe" className={classes.large} />}
        title={item.customer}
        subheader={item.title}
        className={classes.CardHeader}
        classes={{
          title: classes.headerCustomer,
          subheader: classes.headerTitle,
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.commentStyle}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          <FormatQuoteIcon className={clsx(classes.rotate, classes.quote)} />
          {item.comment}
          <FormatQuoteIcon className={classes.quote} />
        </Typography>
      </CardContent>
    </Card>
  ));
  return (
    <Box className={classes.wrapperMedia} component="div">
      <Box maxWidth="1140px" m="auto">
        <Box pt={5} pb={10}>
          <Box className={classes.center} component="h2" fontWeight="fontWeightBold">
            Khách hàng nói gì về thuocsi
          </Box>
          <Slider ref={ref} {...settings}>
            {sliderItem}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderComp;
