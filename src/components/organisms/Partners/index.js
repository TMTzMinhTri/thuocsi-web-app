import React, { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Container } from '@material-ui/core';
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
    <div style={{ padding: '40px 0' }} className={styles.wrapper}>
      <Container fixed>
        <h2 className={styles.title}>Đối tác của thuocsi.vn</h2>
        <Slider ref={ref} {...settingsPartner}>
          {partnerItem}
        </Slider>
      </Container>
    </div>
  );
};

export default React.memo(Partners);
