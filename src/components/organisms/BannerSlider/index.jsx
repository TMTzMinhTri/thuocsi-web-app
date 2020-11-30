import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Box } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { settingsSliderBanner } from '../../../constants/data';
import { useDragDetection } from '../../../hooks';
import styles from './styles.module.css';

const checkCondition = ({ link, image, alt }) => {
  const urlImage = `url(${image})`;
  const ItemBox = (
    <Box position="relative">
      <Box className={styles.banner_bg_img} />
      <Box style={{ backgroundImage: urlImage }} className={styles.banner_img} />
    </Box>
  );
  if (link && link.length > 0) {
    return (
      <a alt={alt} title={alt} href={link}>
        {ItemBox}
      </a>
    );
  }
  return ItemBox;
};

const BannerSlider = ({ infoBanner }) => {
  const { handleMouseDown, dragging } = useDragDetection();
  const ref = useRef({});
  const handleChildClick = (e) => {
    if (dragging) {
      e.preventDefault();
    }
  };

  const sliderItem = infoBanner.map((item) => {
    const itemSlider = checkCondition(item);
    return (
      <div
        key={`slider-${item.id}`}
        onMouseDownCapture={handleMouseDown}
        onClickCapture={handleChildClick}
      >
        {itemSlider}
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
