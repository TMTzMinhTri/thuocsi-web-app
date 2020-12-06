import React from 'react';
import styled from 'styled-components';
import SignInFormCustom from './SignInForm';

const SignInForm = styled(SignInFormCustom)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(SignInForm);
