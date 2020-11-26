import React, { useRef } from 'react';
import Image from 'next/image';
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

const image = [
  { id: 1, url: '/images/partner/logo_anthien.jpg', width: '185', height: '185' },
  { id: 2, url: '/images/partner/logo_domesco.jpg', width: '185', height: '185' },
  { id: 3, url: '/images/partner/logo_gsk.jpg', width: '185', height: '185' },
  { id: 4, url: '/images/partner/logo_imex.jpg', width: '185', height: '185' },
  { id: 5, url: '/images/partner/logo_mp.jpg', width: '185', height: '185' },
  { id: 6, url: '/images/partner/logo_nic.jpg', width: '185', height: '185' },
  { id: 7, url: '/images/partner/logo_pharmedic.jpg', width: '185', height: '185' },
  { id: 8, url: '/images/partner/logo_sanofi.jpg', width: '185', height: '185' },
  { id: 9, url: '/images/partner/logo_stada.jpg', width: '185', height: '185' },
  { id: 10, url: '/images/partner/logo_usp.jpg', width: '185', height: '185' },
  { id: 11, url: '/images/partner/logo_vpc.jpg', width: '185', height: '185' },
];

const Partners = () => {
  const classes = useStyles();

  const ref = useRef({});

  const settings = {
    className: 'section-outstanding__slider',
    slidesToShow: 6,
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
          slidesToShow: 5,
          slidesToScroll: 2,
          rows: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const partnerItem = image.map((item) => (
    <Image
      src={item.url}
      key={`partner-${item.id}`}
      width={item.width}
      height={item.height}
      className={classes.root}
    />
  ));
  return (
    <Box component="div">
      <Box maxWidth="1140px" m="auto">
        <Box pt={5} pb={5}>
          <Box
            className={classes.center}
            component="h2"
            fontSize="32px"
            color="#00b46e"
            fontWeight="fontWeightMedium"
          >
            Đối tác của thuocsi.vn
          </Box>
          <Slider ref={ref} {...settings}>
            {partnerItem}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Partners;
