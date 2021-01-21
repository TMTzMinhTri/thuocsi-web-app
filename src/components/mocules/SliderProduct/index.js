import React, { useRef } from 'react';
import Slider from 'react-slick';
import { Box } from '@material-ui/core';
import { settingsProduct } from 'constants/data';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LinkComp } from 'components/atoms';

import styles from './styles.module.css';

const SliderProduct = ({ children, name, slug, viewMore }) => {
  const ref = useRef({});
  return (
    <div className={styles.wrapper_media}>
      <Box maxWidth="1240px" m="auto">
        <div className={styles.SliderProductWrap}>
          <Box
            className={styles.title}
            component="h2"
            fontSize="32px"
            color="#00b46e"
            fontWeight="fontWeightMedium"
          >
            {name}
          </Box>
          <Slider ref={ref} {...settingsProduct}>
            {children}
          </Slider>
          {viewMore && (
            <LinkComp href={`${slug}`} className={styles.seeAll}>
              Xem tất cả
            </LinkComp>
          )}
        </div>
      </Box>
    </div>
  );
};

export default SliderProduct;
