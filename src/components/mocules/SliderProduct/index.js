import React, { useRef } from 'react';
import Slider from 'react-slick';
import { settingsProduct } from 'constants/data';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LinkComp } from 'components/atoms';

import styles from './styles.module.css';

const SliderProduct = ({ children, name, redirect, viewMore }) => {
  const ref = useRef({});
  return (
    <div className={styles.wrapper_media}>
      <div className={styles.wrapper_media_container}>
        <div className={styles.SliderProductWrap}>
          <h2 className={styles.title}>{name}</h2>
          <Slider ref={ref} {...settingsProduct}>
            {children}
          </Slider>
          {viewMore && (
            <LinkComp href={`${redirect}`} color="#fff" className={styles.seeAll}>
              Xem tất cả
            </LinkComp>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderProduct;
