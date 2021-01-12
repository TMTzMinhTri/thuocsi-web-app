import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Box, Container } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { imagePartnerSlider, settingsPartner } from 'constants/data';

import styles from './styles.module.css';

const Partners = () => {
  const ref = useRef({});
  const partnerItem = imagePartnerSlider.map((item) => (
    <div key={`partner-${item.id}`} className={styles.item}>
      <Image src={item.url} width={item.width} height={item.height} />
    </div>
  ));

  return (
    <Box py={5} className={styles.wrapper}>
      <Container fixed>
        <Box
          className={styles.center}
          component="h2"
          fontSize="32px"
          color="#00b46e"
          fontWeight="fontWeightMedium"
        >
          Đối tác của thuocsi.vn
        </Box>
        <Slider ref={ref} {...settingsPartner}>
          {partnerItem}
        </Slider>
      </Container>
    </Box>
  );
};

export default React.memo(Partners);
