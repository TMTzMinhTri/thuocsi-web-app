import React, { memo } from 'react';
import { Input } from '@material-ui/core';

import styles from './styles.module.css';

const InputComp = memo(() => (
  <Input
    classes={{ root: styles.root_input, input: styles.input, focused: styles.focus }}
    disableUnderline
  />
));

export default InputComp;
