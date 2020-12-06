import React from 'react';
import styled from 'styled-components';
import CheckBoxCustom from './CheckBox';

const CheckBox = styled(CheckBoxCustom)`
  // color: ${(props) => (props.isChecked ? '#fff' : '#000')};
  input {
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
