import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import Image from 'next/image';
import { imageMediaTop, imageMediaBottom } from 'constants/data';

import styles from './styles.module.css';

const renderMediaItem = (data) =>
  data.map((item) => (
    <Grid key={`media-${item.id}`} className={styles.hover_link} item xs={3}>
      <Image
        className={item.dark && styles.dark}
        src={item.url}
        width={item.width}
        height={item.height}
      />
    </Grid>
  ));

const Media = () => (
  <div className={styles.media_wrapper}>
    <Box fontWeight="fontWeightMedium">
      <Typography variant="h4" align="center">
        Truyền thông nói gì về thuocsi.vn
      </Typography>
    </Box>

    <Grid direction="column" container>
      <Grid className={styles.container} container item xs={12} alignItems="center">
        {renderMediaItem(imageMediaTop)}
      </Grid>
      <Grid className={styles.container} container item xs={12} alignItems="center">
        {renderMediaItem(imageMediaBottom)}
      </Grid>
    </Grid>
  </div>
);

export default Media;
