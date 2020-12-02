import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const CircularButton = memo(({ plus }) => (
  <>
    <IconButton
      classes={{
        root: plus ? clsx(styles.button_root, styles.plus) : clsx(styles.button_root, styles.minus),
      }}
    >
      {plus ? <Add className={styles.icon} /> : <Remove className={styles.icon} />}
    </IconButton>
  </>
));

CircularButton.defaultProps = {
  plus: false,
};

CircularButton.propTypes = {
  plus: PropTypes.bool,
};

export default CircularButton;
