import React from 'react';
import styled from 'styled-components';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckBoxCustom = React.memo((props) => {
  const { isChecked, name, label, className, onChange, ...rest } = props;
  const checkBox = <Checkbox checked={isChecked} name={name} {...rest} />;
  return <FormControlLabel control={checkBox} className={className} label={label} {...rest} />;
});

const CheckBox = styled(CheckBoxCustom)`
  .MuiCheckbox-colorSecondary.Mui-checked {
    color: green;
  }
  input.checked {
    color: green;
  }
  input[type='checkbox']:checked {
    color: green;
    background-color: green;
  }
`;

export default React.memo(CheckBox);
