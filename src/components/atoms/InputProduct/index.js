import React, { memo } from 'react';
import { Input } from '@material-ui/core';

import styles from './styles.module.css';

const InputProduct = memo(({ name, searchInput, key, onChange, value, product }) => (
  <Input
    name={name}
    key={key}
    inputRef={searchInput}
    classes={{ root: styles.root_input, input: styles.input, focused: styles.focus }}
    disableUnderline
    placeholder="0"
    onChange={(e) => onChange(e, product)}
    value={value}
  />
));

export default InputProduct;
