import { InfoContainer, ReferralList } from 'components';
import { Container } from '@material-ui/core';

const TestingAccountForm = () => (
  <Container>
    <InfoContainer value={3} title="Giới thiệu bạn bè">
      <ReferralList />
    </InfoContainer>
  </Container>
);

export default TestingAccountForm;
