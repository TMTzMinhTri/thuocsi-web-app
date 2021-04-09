import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { EmailOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import {
  LINK_APPLESTORE,
  LINK_GOOGLEPLAY,
  LOGO_MOBILE,
  LOGO_GOOGLEPLAY,
  LOGO_APPSTORE,
} from 'constants/Images';
import styles from '../styles.module.css';

const FooterRightItem = () => (
  <Grid xs={5} item>
    <div>
      <p className={styles.footer_header}>LIÊN HỆ</p>
      <div className={styles.email_wrap}>
        <div className={styles.icon_circle}>
          <EmailOutlined style={{ width: '20x', height: '20px' }} />
        </div>
        <Link href="mailto:hotro@thuocsi.vn" prefetch={false}>
          <Typography className={clsx(styles.contact, styles.divider, styles.link)}>
            hotro@thuocsi.vn
          </Typography>
        </Link>
        <a href="https://www.facebook.com/thuocsivn/" className={styles.icon_fb}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      </div>
      {/* <div className={styles.phone_wrap}>
        <div>
          <div className={styles.icon_circle}>
            <Call
              style={{
                width: '22px',
                height: '22px',
              }}
            />
          </div>
        </div>
        <Link href="tel:02873008840">
          <Typography className={clsx(styles.contact, styles.link)}>02 873 008 840</Typography>
        </Link>
      </div> */}
    </div>
    <div>{/* <small>Từ T2 đến T6: 8:00 - 18:00</small> */}</div>
    <div className={styles.mb2}>
      <Image src={LOGO_MOBILE} width="445" height="445" />
    </div>

    <div className={styles.download_area}>
      <a href={LINK_APPLESTORE}>
        <Image src={LOGO_APPSTORE} width="159" height="48" />
      </a>
      <a href={LINK_GOOGLEPLAY}>
        <Image src={LOGO_GOOGLEPLAY} width="162" height="51" />
      </a>
    </div>
  </Grid>
);

export default React.memo(FooterRightItem);
