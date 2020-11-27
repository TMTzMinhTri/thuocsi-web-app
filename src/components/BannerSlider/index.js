import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Box } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { settingsSliderBanner } from '../../constants/data';
import useDragDetection from '../../hooks/useDragDetection';
import styles from './styles.module.css';

const BannerSlider = ({ infoBanner }) => {
  const { handleMouseDown, dragging } = useDragDetection();
  const ref = useRef({});
  const handleChildClick = (e) => {
    if (dragging) {
      e.preventDefault();
    }
  };
  const sliderItem = infoBanner.map((item) => {
    // eslint-disable-next-line operator-linebreak
    const checkCondition =
      item.link.length > 0 ? (
        <a alt={item.alt} title={item.alt} href={item.link}>
          <Box position="relative">
            <Box className={styles.banner_bg_img} />
            <Box style={{ backgroundImage: `url(${item.image})` }} className={styles.banner_img} />
          </Box>
        </a>
      ) : (
        <Box position="relative">
          <Box className={styles.banner_bg_img} />
          <Box style={{ backgroundImage: `url(${item.image})` }} className={styles.banner_img} />
        </Box>
      );

    return (
      <div
        key={`slider-${item.id}`}
        onMouseDownCapture={handleMouseDown}
        onClickCapture={handleChildClick}
      >
        {checkCondition}
      </div>
    );
  });

  return (
    <Box m="auto" component="div">
      <Slider ref={ref} {...settingsSliderBanner}>
        {sliderItem}
      </Slider>
    </Box>
  );
};

export default BannerSlider;
