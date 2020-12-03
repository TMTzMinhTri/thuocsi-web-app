import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import IconCircularProps from 'constants/IconCircularType';

import styles from './styles.module.css';

const CircularButton = memo(({ type }) => {
  const props = IconCircularProps[type];
  const { backgroundColor, icon, border, color } = props;
  return (
    <>
      <IconButton classes={{ root: styles.button_root }} style={{ backgroundColor, border, color }}>
        {icon}
      </IconButton>
    </>
  );
});

export default CircularButton;
