import {
  InfoContainer,
  // AccountInfoFormContainer,
  // OrderInfoFormContainer,
  ShareList,
} from 'components';
import { Container } from '@material-ui/core';

const TestingAccountForm = () => (
  <Container>
    <InfoContainer value={3} title="Đơn hàng của tôi">
      {/* <AccountInfoFormContainer /> */}
      <ShareList />
    </InfoContainer>
  </Container>
);

export default TestingAccountForm;
