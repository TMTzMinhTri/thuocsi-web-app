import { Container } from '@material-ui/core';
import Template from 'components/layout/Template';
import React from 'react';
import TermAndCondition from './terms-and-condition';

const TermAndConditionPage = ({ isMobile }) => {
  const title = 'Điều Khoản Sử Dụng - Đặt thuốc sỉ rẻ thơn tại thuocsi.vn';
  return (
    <Template title={title} isMobile={isMobile}>
      <div style={{ padding: '50px' }}>
        <Container maxWidth="lg">
          <TermAndCondition />
        </Container>
      </div>
    </Template>
  );
};
export default React.memo(TermAndConditionPage);
