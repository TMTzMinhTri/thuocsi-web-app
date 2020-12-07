import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckBoxCustom = React.memo((props) => {
  const { isChecked, name, label, className, onChange, ...rest } = props;
  const checkBox = <Checkbox checked={isChecked} name={name} {...rest} />;
  return <FormControlLabel control={checkBox} className={className} label={label} {...rest} />;
});

export default CheckBoxCustom;
