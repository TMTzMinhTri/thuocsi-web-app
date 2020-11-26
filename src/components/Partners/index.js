import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { makeStyles, Box } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { image, settingsPartner } from '../../constants/data';

const useStyles = makeStyles(() => ({
  center: {
    textAlign: 'center',
  },
}));

const Partners = () => {
  const classes = useStyles();
  const ref = useRef({});
  const partnerItem = image.map((item) => (
    <Image src={item.url} key={`partner-${item.id}`} width={item.width} height={item.height} />
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
          <Slider ref={ref} {...settingsPartner}>
            {partnerItem}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Partners;
