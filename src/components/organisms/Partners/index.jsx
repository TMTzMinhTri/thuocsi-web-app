import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Box } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { imagePartnerSlider, settingsPartner } from 'constants/data';

import styles from './styles.module.css';

const Partners = () => {
  const ref = useRef({});
  const partnerItem = imagePartnerSlider.map((item) => (
    <Image src={item.url} key={`partner-${item.id}`} width={item.width} height={item.height} />
  ));

  return (
    <Box component="div">
      <Box maxWidth="1140px" m="auto">
        <Box pt={5} pb={5}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Partners);
