import React from 'react';
import styled from 'styled-components';
import AuthModalCustom from './AuthModal';

const AuthModal = styled(AuthModalCustom)`
  .auth-modal {
    &-content {
      font-size: 13px;
      position: relative;
      width: ${({ width = 500 }) => width}px;
      background: ${({ theme }) => theme.modal.background};
      border: 1px solid rgba(0, 0, 0, 0.2);
      boxshadow: theme.shadows[5];
      border-radius: 1.25em;
      outline: 0;
    }
    &-header {
      display: flex;
      align-items: flex-start;
      text-align: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(195, 204, 220, 0.4);
    }
    &-title {
      padding: 1rem 2rem;
      font-size: larger;
      font-weight: 500;
      margin-bottom: 0;
      line-height: 1.5;
      text-transform: capitalize;
    }
    &-close {
      background-color: transparent;
      border: 0;
      color: #000;
      opacity: 0.5;
    }
    &-body {
      position: relative;
      flex: 1 1 auto;
      padding: 1rem;
    }
  }
  @media screen and (max-width: 767px) {
    .auth-modal {
      &-header {
        line-height: 32px;
      }
    }
  }
`;

export default React.memo(AuthModal);
