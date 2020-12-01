import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { HighQuality, LocalShippingOutlinedIcon, NewReleases } from '@material-ui/icons';
import Group from '@material-ui/icons/Group';
import styles from './style.module.css';

const WhyBuymed = () => (
  <Box className={styles.why_buymed_wrapper}>
    <Box maxWidth="1140px" m="auto">
      <Grid container>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12}>
            <HighQuality style={{ fontSize: 110, color: '#fff' }} />
          </Grid>
          <Grid className={styles.reason_content} item md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12}>
            <NewReleases style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              TIN TỨC CHUYÊN MÔN
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Cập nhật tin tức mới, và chính xác
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12}>
            <LocalShippingOutlinedIcon style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              GIAO HÀNG NHANH
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Đảm bảo trong 36 giờ, an toàn và tin cậy
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} item md={12}>
            <Group style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} item md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              ĐỘI NGŨ CHUYÊN NGHIỆP
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Tư vấn miễn phí, tận tình và chu đáo
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default WhyBuymed;
