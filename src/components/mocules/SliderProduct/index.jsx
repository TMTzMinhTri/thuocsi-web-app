import React, { useRef } from 'react';
import Slider from 'react-slick';
import {
  Box,
} from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settingsProduct } from 'constants/data';

import styles from './styles.module.css';

const SliderProduct = ({ children }) => {
  const ref = useRef({});

  return (
    <Box className={styles.wrapper_media} component="div">
      <Box maxWidth="1240px" m="auto">
        <Box pt={5} pb={10}>
          <Box
            className={styles.center}
            component="h2"
            fontSize="32px"
            color="#00b46e"
            fontWeight="fontWeightMedium"
          >
            Sản phẩm bán chạy
          </Box>
          <Slider ref={ref} {...settingsProduct}>
            {children}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderProduct;
