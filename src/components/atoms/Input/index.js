import React from 'react';
import styled from 'styled-components';
import InputCustom from './Input';

const Input = styled(InputCustom)`
  //   padding: 0.25rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
  margin: 1rem 1rem;
  height: 50px;
  width: 100%;
  border: none;
`;

export default React.memo(Input);
