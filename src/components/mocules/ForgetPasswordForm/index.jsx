import React from 'react';
import styled from 'styled-components';
import ForgetPasswordForm from './ForgetPasswordForm';

const styledForgetPasswordForm = styled(ForgetPasswordForm)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-control {
    width: 400px;
  }

  .btnForgetPassword {
    background: linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%);
    color: white;
    height: 50px;
    bow-shadow: 0px 3px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    padding: 1.5rem;
  }
`;

export default React.memo(styledForgetPasswordForm);
