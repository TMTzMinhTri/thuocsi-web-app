import React from 'react';
import { Box } from '@material-ui/core';
import { RIBBON_STATUS } from 'constants/Enums';

import { Button, PrintInvoiceButton, ResponseButton, EditOrderButton, EventBadge, NewBadge, RibbonPriceDown, Ribbon, RibbonPriceUp } from 'components';

const TestingButton = () => (
  <>
    <Button variant="contained" type="warning">
      Đăng nhập
    </Button>

    <Button variant="contained" type="success">
      Tạo tài khoản
    </Button>
    <PrintInvoiceButton />
    <ResponseButton />
    <EditOrderButton />
    {/* <CheckBox> A </CheckBox> */}
    <Box>
      <EventBadge>x1.5 Điểm Tích Lũy</EventBadge>
    </Box>
    <Box>
      <NewBadge>Mới</NewBadge>
    </Box>
    <Box> <RibbonPriceDown /> </Box>
    <Box> <RibbonPriceUp /> </Box>
    <Box> <Ribbon status={RIBBON_STATUS.UP} /> </Box>

  </>
);
export default TestingButton;
