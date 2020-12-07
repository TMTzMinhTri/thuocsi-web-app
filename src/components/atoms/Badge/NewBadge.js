import React from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

import styles from './styles.module.css';

const NewBadge = () => <Box className={clsx(styles.badge_product, styles.new_badge)}>Mới</Box>;

export default NewBadge;
