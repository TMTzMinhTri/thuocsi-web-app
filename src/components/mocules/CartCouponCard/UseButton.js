import { Button } from 'components/atoms';
import styled from 'styled-components';

const StyledUseButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 22px !important;
  text-transform: none !important;
  color: #00b46e !important;
  border: 1px solid #00b46e !important;
  background: transparent !important;
  padding: 4px 10px !important;
  transition: 0.5s;
  &:hover {
    color: #fff !important;
    background-color: #00b46e !important;
    border-color: #00b46e !important;
  }
`;

export default StyledUseButton;
