import React, { memo } from 'react';
import { Input } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.css';

const InputProduct = memo(({ className, name, searchInput, key, onChange, value, product }) => (
  <Input
    name={name}
    key={key}
    inputRef={searchInput}
    classes={{
      root: clsx(styles.root_input, className),
      input: styles.input,
      focused: styles.focus,
    }}
    disableUnderline
    placeholder="0"
    onChange={(e) => onChange(e, product)}
    value={value}
  />
));

export default InputProduct;
