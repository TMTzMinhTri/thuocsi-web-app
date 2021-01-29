import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Image from 'next/image';
import { imageMediaTop, imageMediaBottom } from 'constants/data';

import styles from './styles.module.css';

const renderMediaItem = (data) =>
  data.map((item) => (
    <Grid key={`media-${item.id}`} className={styles.hover_link} item xs={6} sm={4} md={3}>
      <a href={item.href} target="_blank" rel="noreferrer">
        <Image
          className={item.dark && styles.dark}
          src={item.url}
          width={item.width}
          height={item.height}
        />
      </a>
    </Grid>
  ));

const Media = () => (
  <div className={styles.media_wrapper}>
    <div style={{ fontWeight: 500 }}>
      <Typography variant="h4" align="center" className={styles.center}>
        Truyền thông nói gì về thuocsi.vn
      </Typography>
    </div>

    <div>
      <Grid container className={styles.container} item alignItems="center">
        {renderMediaItem(imageMediaTop)}
        {renderMediaItem(imageMediaBottom)}
      </Grid>
    </div>
  </div>
);

export default Media;
