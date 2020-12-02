import { Typography, Box } from '@material-ui/core';
import React from 'react';

import styles from './style.module.css';

const Tag = ({ backgroundColor, text, color, icon }) => (
  <Box component="div" className={styles.tag_root} style={{ color, backgroundColor }}>
    {icon}
    <Typography className={styles.text}>{text}</Typography>
  </Box>
);

export default Tag;
