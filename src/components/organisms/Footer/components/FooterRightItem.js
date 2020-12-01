import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import Facebook from '@material-ui/icons/Facebook';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import Call from '@material-ui/icons/Call';
import clsx from 'clsx';

import {
  LINK_APPLESTORE,
  LINK_GOOGLEPLAY,
  LOGO_MOBILE,
  LOGO_GOOGLEPLAY,
  LOGO_APPSTORE,
} from '../../../../constants';
import styles from '../styles.module.css';

const FooterRightItem = () => (
  <Grid xs={5} item>
    <Box>
      <p className={styles.footer_header}>LIÊN HÊ</p>
      <Box mb={2} display="flex" flexDirection="row" alignItems="center">
        <Box className={styles.icon_circle}>
          <EmailOutlined style={{ width: '20x', height: '20px' }} />
        </Box>
        <Link href="/">
          <Typography className={clsx(styles.contact, styles.divider, styles.link)}>
            hotro@thuocsi.vn
          </Typography>
        </Link>
        <Facebook style={{ color: '#3b5998', fontSize: 30 }} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box>
          <Box className={styles.icon_circle}>
            <Call
              style={{
                width: '22px',
                height: '22px',
              }}
            />
          </Box>
        </Box>
        <Link href="tel:02873008840">
          <Typography className={clsx(styles.contact, styles.link)}>02 873 008 840</Typography>
        </Link>
      </Box>
    </Box>
    <Box>
      <small>Từ T2 đến T6: 8:00 - 18:00</small>
    </Box>
    <Box mb={2}>
      <Image src={LOGO_MOBILE} width="445" height="445" />
    </Box>

    <Box display="flex" flexWrap="wrap" justifyContent="space-around">
      <a href={LINK_APPLESTORE}>
        <Image src={LOGO_APPSTORE} width="159" height="48" />
      </a>
      <a href={LINK_GOOGLEPLAY}>
        <Image src={LOGO_GOOGLEPLAY} width="162" height="51" />
      </a>
    </Box>
  </Grid>
);

export default React.memo(FooterRightItem);
