import { Typography } from '@material-ui/core';
import React from 'react';

import styles from './style.module.css';

const Tag = ({ border, text, color, icon, date = null }) => (
  <div className={styles.tag_root} style={{ color, border }}>
    {icon}
    <Typography className={styles.text}>
      {text}
      {date && `: ${date}`}
    </Typography>
  </div>
);

export default Tag;
