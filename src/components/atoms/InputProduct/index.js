import React, { memo } from 'react';
import { Input } from '@material-ui/core';

import styles from './styles.module.css';

const InputProduct = memo(({ searchInput, key }) => (
  <Input
    key={key}
    inputRef={searchInput}
    classes={{ root: styles.root_input, input: styles.input, focused: styles.focus }}
    disableUnderline
    placeholder="0"
  />
));

export default InputProduct;
