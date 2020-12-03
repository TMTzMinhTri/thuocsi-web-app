import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const MinusButton = memo(() => (
  <>
    <IconButton classes={{ root: clsx(styles.button_root, styles.plus) }} className={styles.minus}>
      <Remove className={styles.icon} />
    </IconButton>
  </>
));

export default MinusButton;
