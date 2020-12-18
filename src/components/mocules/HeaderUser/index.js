import React from 'react';
import styled from 'styled-components';
import HeaderUser from './HeaderUser';

const StyledHeaderUser = styled(HeaderUser)`
  border-radius: 50px;
  background-color: #f9b514;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5em 0.75em;

  .header_user_name {
    color: white;
    text-transform: capitalize;
    font-weight: 500;
    min-width: 7em;
  }
  .header_user_avatar {
    border-radius: 50%;
    border: 3px solid white;
    position: absolute;
    right: 0;
  }
`;

export default React.memo(StyledHeaderUser);
