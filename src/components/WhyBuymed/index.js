import React from 'react';
import { Box, Grid } from '@material-ui/core';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import styles from './style.module.css';

const WhyBuymed = () => (
  <Box className={styles.why_buymed_wrapper}>
    <Box maxWidth="1140px" m="auto">
      <Grid container>
        <Grid className={styles.reason_item} item md={3} xs={12}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} md={12}>
            <LocalShippingOutlinedIcon style={{ fontSize: 110, color: '#fff' }} />
          </Grid>
          <Grid className={styles.reason_content} md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} md={12}>
            <LocalShippingOutlinedIcon style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} md={12}>
            <LocalShippingOutlinedIcon style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
        <Grid className={styles.reason_item} item md={3}>
          <Grid style={{ display: 'flex', justifyContent: 'center' }} md={12}>
            <LocalShippingOutlinedIcon style={{ fontSize: 110, color: '#fff' }} />
          </Grid>{' '}
          <Grid className={styles.reason_content} md={12}>
            <Box fontSize="18px" fontWeight="fontWeightBold" color="#fff">
              SẢN PHẨM CHẤT LƯỢNG
            </Box>
            <Box fontSize="15px" fontWeight={400} color="#fff" px={6} textAlign="center">
              Từ nhà máy, nhà phân phối uy tín
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default WhyBuymed;
