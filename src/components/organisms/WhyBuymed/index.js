import React from 'react';
import { Box, Grid, Container } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';

import styles from './style.module.css';

const WhyBuymed = () => (
  <Box className={styles.why_buymed_wrapper}>
    <Container maxWidth="1140px" fixed>
      <Grid container>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-quality', styles.icon)} />
          </Grid>
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-news-professional', styles.icon)} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              TIN TỨC CHUYÊN MÔN
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" textAlign="center">
              Cập nhật tin tức mới, và chính xác
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-ship-express', styles.icon)} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              GIAO HÀNG NHANH
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" textAlign="center">
              Đảm bảo trong 36 giờ, an toàn và tin cậy
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12} xs={4}>
            <Icon className={clsx('icon-support', styles.icon)} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12} xs={8}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              ĐỘI NGŨ CHUYÊN NGHIỆP
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" textAlign="center">
              Tư vấn miễn phí, tận tình và chu đáo
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default WhyBuymed;
