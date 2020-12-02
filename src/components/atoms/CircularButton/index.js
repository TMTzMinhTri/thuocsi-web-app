import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Input } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const CircularButton = memo(({ plus }) => (
  <>
    <Input
      classes={{ root: styles.root_input, input: styles.input, focused: styles.focus }}
      disableUnderline
    />
    <IconButton
      classes={{ root: plus ? clsx(styles.root, styles.plus) : clsx(styles.root, styles.minus) }}
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
